import { Expose } from 'class-transformer'

export class HealthMessagesDto {
  readonly pending: number

  readonly processing: number

  readonly resolved: number

  readonly failed: number

  @Expose({ name: 'last_at' })
  readonly lastAt: number
}
