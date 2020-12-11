import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import IHashProvider from '../providers/hashProvider/models/IHashProvider'
import IUsersRepository from '../repositories/IUsersRepository'
import User from '../infra/typeorm/entities/User'

interface IRequest {
  user_id: string
  name: string
  email: string
  old_password?: string
  password?: string
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    const userEmailExist = await this.usersRepository.findByEmail(email)

    if (userEmailExist && userEmailExist.id !== user_id) {
      throw new AppError('This email already exist, change to other.')
    }

    user.name = name
    user.email = email

    if (password && !old_password) {
      throw new AppError('Inform the old password to set a new password.')
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      )
      if (!checkOldPassword) {
        throw new AppError('The old password does not match')
      }

      user.password = await this.hashProvider.generateHash(password)
    }

    return this.usersRepository.save(user)
  }
}

export default UpdateProfileService
