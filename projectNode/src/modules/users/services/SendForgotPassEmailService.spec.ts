import AppError from '@shared/errors/AppError'

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import SendForgotPassEmailService from './SendForgotPassEmailService'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let fakeMailProvider: FakeMailProvider
let sendForgotPassEmail: SendForgotPassEmailService

describe('SendForgotPassEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeMailProvider = new FakeMailProvider()
    fakeUserTokensRepository = new FakeUserTokensRepository()

    sendForgotPassEmail = new SendForgotPassEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    )
  })

  it('should be able to send email to recover password using your email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonh@example.com',
      password: '123456',
    })

    await sendForgotPassEmail.execute({
      email: 'jonh@example.com',
    })

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPassEmail.execute({
        email: 'jonh@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate')

    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonh@example.com',
      password: '123456',
    })

    await sendForgotPassEmail.execute({
      email: 'jonh@example.com',
    })

    expect(generateToken).toHaveBeenCalledWith(user.id)
  })
})
