import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export type MessageType = 'submitted' | 'accepted' | 'rejected'

@Entity()
export class Message {
  @PrimaryGeneratedColumn({ name: 'notiid' })
  readonly notiId: number

  @Column({ name: 'userid' })
  readonly userId: string

  @Column()
  readonly type: MessageType

  @Column({ name: 'requestedat' })
  readonly requestedAt: Date

  @Column({ name: 'resolvedat' })
  readonly resolvedAt: Date

  @Column()
  readonly errors: string
}
