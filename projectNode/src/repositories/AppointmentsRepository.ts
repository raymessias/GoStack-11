/**
 * Repository - Responsável por fazer as operações dos dados da aplicação,
 * se for usar métodos nativos como (create, delete, update), já se usa dentro do services
 * caso o método seja peculiar, no caso, essa busca no banco não existe nativamente.
 */

import { EntityRepository, Repository } from 'typeorm'

import Appointment from '../models/Appointment'

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    })

    return findAppointment || null
  }
}

export default AppointmentsRepository
