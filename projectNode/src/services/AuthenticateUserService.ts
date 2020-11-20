import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../models/User'

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}

class AuthenticateUSerService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({ where: { email } })

    if (!user) {
      throw new Error('Incorrect email/password combination.')
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.')
    }

    const token = sign({}, '32d6abcad6d97ac2507b3153e592e649', {
      subject: user.id,
      expiresIn: '1d',
    })

    return {
      user,
      token,
    }
  }
}

export default AuthenticateUSerService
