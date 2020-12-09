import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider'
import ResetPassService from './ResetPassService'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let fakeHashProvider: FakeHashProvider
let resetPass: ResetPassService

describe('ResetPassService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    fakeHashProvider = new FakeHashProvider()
    resetPass = new ResetPassService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    )
  })

  it('should be able to reset password using user token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonh@example.com',
      password: '123456',
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    await resetPass.execute({
      password: '123123',
      token,
    })

    const updatedUser = await fakeUsersRepository.findById(user.id)

    expect(generateHash).toHaveBeenCalledWith('123123')
    expect(updatedUser?.password).toBe('123123')
  })

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPass.execute({
        token: 'non-existing-token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    )

    await expect(
      resetPass.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset password if passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonh@example.com',
      password: '123456',
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date()
      return customDate.setHours(customDate.getHours() + 3)
    })

    await expect(
      resetPass.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
