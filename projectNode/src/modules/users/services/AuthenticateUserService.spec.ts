import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider'
import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'

describe('CreateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const CreateUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    )

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    )

    const user = await CreateUser.execute({
      name: 'Jonh Doe',
      email: 'Jonh@example.com',
      password: '123456',
    })

    const response = await authenticateUser.execute({
      email: 'Jonh@example.com',
      password: '123456',
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    )

    await expect(
      authenticateUser.execute({
        email: 'Jonh@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate if wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const CreateUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    )

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    )

    await CreateUser.execute({
      name: 'Jonh Doe',
      email: 'Jonh@example.com',
      password: '123456',
    })

    await expect(
      authenticateUser.execute({
        email: 'Jonh@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})