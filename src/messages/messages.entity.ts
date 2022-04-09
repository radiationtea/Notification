import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export type MessageStatus = 'pending' | 'processing' | 'resolved' | 'failed'
export type MessageType = 'submitted' | 'accepted' | 'rejected'

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: 'pending' })
  status: MessageStatus

  @Column()
  type: MessageType

  @Column()
  content: string

  @Column()
  phoneNumber: string

  @Column()
  requestedAt: Date

  @Column()
  resolvedAt?: Date

  @Column()
  errors?: string
}
