import { Type } from 'class-transformer'
import { IsInt, Min } from 'class-validator'

export class GetMessageDto {
  @IsInt()
  @Min(0)
  @Type(() => Number)
  readonly id: number
}
