import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity()
export class Users {
  @PrimaryColumn({ name: 'userid' })
  readonly userId: string

  @Column({ name: 'phone' })
  readonly phoneNumber: string

  @Column()
  readonly name: string
}
