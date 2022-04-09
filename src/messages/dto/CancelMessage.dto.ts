import { IsUUID } from 'class-validator'

export class CancelMessageDto {
  @IsUUID()
  readonly id: string
}
