import { MessageStatus, MessageType } from '../messages.entity'
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator'
import { Expose, Type } from 'class-transformer'

export class QueryMessagesDto {
  @IsOptional()
  @IsIn(['pending', 'processing', 'resolved', 'failed', 'all'])
  readonly status: MessageStatus | 'all'

  @IsOptional()
  @IsIn(['submitted', 'accepted', 'rejected', 'all'])
  readonly type: MessageType | 'all'

  @IsOptional()
  @IsInt()
  @Max(100)
  @Min(1)
  @Type(() => Number)
  @Expose({ name: 'per_pages' })
  readonly perPages?: number

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  readonly page?: number
}
