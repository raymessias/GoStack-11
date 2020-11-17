/**
 * Model - Responsável pelo o formato dos dados
 */

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  provider: string

  @Column('timestamp with time zone')
  date: Date
}

export default Appointment
