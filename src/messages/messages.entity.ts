import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export type MessageType = 'submitted' | 'accepted' | 'rejected'

@Entity()
export class Messages {
  @PrimaryGeneratedColumn({ name: 'msgid' })
  readonly notiId: number

  @Column()
  readonly type: MessageType

  @Column({ name: 'requestedat' })
  readonly requestedAt: Date

  @Column({ name: 'resolvedat' })
  readonly resolvedAt: Date

  @Column()
  readonly errors: string

  @Column()
  readonly content: string

  @Column()
  readonly phone: string
}
