import { Request, Response } from 'express'
import createUser from './services/CreateUser'

export function helloWorld(req: Request, res: Response) {
  const user = createUser({
    name: 'Ranon',
    email: 'raymessias@gmail.com',
    password: '123456',
    techs: [
      'node',
      'react',
      'reactNative',
      {title: 'Javascript', experience: 100},
    ],
  })
  return res.json(user)
}
