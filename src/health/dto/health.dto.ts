import { HealthMessagesDto } from './healthMessages.dto'

export class HealthDto {
  readonly subject: string

  readonly uptime: number

  readonly timestamp: number

  readonly messages: HealthMessagesDto
}
