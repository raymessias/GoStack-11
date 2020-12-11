import AppError from '@shared/errors/AppError'

import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateProfileService from './UpdateProfileService'

let fakeHashProvider: FakeHashProvider
let fakeUsersRepository: FakeUsersRepository
let updateProfile: UpdateProfileService

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider()
    fakeUsersRepository = new FakeUsersRepository()

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    )
  })

  it('should be able to update the profile user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
    })

    expect(updatedUser.name).toBe('John Trê')
    expect(updatedUser.email).toBe('johntre@example.com')
  })

  it('should not be able to change the email if another one already exists with the same email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123456',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'john@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
      old_password: '123456',
      password: '123123',
    })

    expect(updatedUser.password).toBe('123123')
  })

  it('should not be able to update the password without the old_password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update the password with wrong old_password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@example.com',
        old_password: 'wrong_old_password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
