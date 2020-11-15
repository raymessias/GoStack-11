import { Request, Response } from 'express'
import EmailService from '../services/EmailService'

const users = [
  { name: 'Raynon', email: 'raymessias@gmail' }
]

export default {
  async index(req: Request, res: Response) {
    res.json(users)
  },

  async create(req: Request, res: Response) {
    const emailService = new EmailService()

    emailService.sendMail({
      to: {
        name: 'Raynon Messias',
        email: 'raymessias@gmail'
      },
      message: {
        subject: 'Bem-vindo ao sistema',
        body: 'Seja bem vindo'
      }
    })

    return res.json({ message: 'OK' })
  }
}