/**
 * Services - Responsável pela regra de negócio (lógica)
 * Uma funcionalidade por arquivo, nesse só se cria um appointment
 */

import { startOfHour, isBefore, getHours } from 'date-fns'
import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import Appointment from '../infra/typeorm/entities/Appointment'

interface IRequest {
  date: Date
  user_id: string
  provider_id: string
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    date,
    user_id,
    provider_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment to yourself")
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date")
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You can create appointments between 8am and 5pm')
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    )

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = await this.appointmentsRepository.create({
      user_id,
      provider_id,
      date: appointmentDate,
    })

    return appointment
  }
}

export default CreateAppointmentService
