import { IsUUID } from 'class-validator'

export class GetMessageDto {
  @IsUUID()
  readonly id: string
}
