import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export type MessageType = 'submitted' | 'accepted' | 'rejected'

@Entity()
export class Messages {
  @PrimaryGeneratedColumn({ name: 'msgid' })
  readonly msgId: number

  @Column()
  readonly type: MessageType

  @Column({ name: 'requestedat', type: 'timestamp' })
  readonly requestedAt: Date

  @Column({ name: 'resolvedat', type: 'timestamp' })
  readonly resolvedAt: Date

  @Column()
  readonly errors: string

  @Column()
  readonly content: string

  @Column()
  readonly phone: string
}
