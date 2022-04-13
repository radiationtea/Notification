import { IsIn, IsInt, IsString, Min } from 'class-validator'
import { MessageType } from '../messages.entity'

export class CreateMessageDto {
  @IsString()
  @IsIn(['submitted', 'accepted', 'rejected'])
  readonly type: MessageType

  @IsInt()
  @Min(0)
  readonly subcategory: number

  @IsString()
  readonly user: string
}
