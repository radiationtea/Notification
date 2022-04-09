import { Controller, Get, Query, Req } from '@nestjs/common'
import { Request } from 'express'
import { ResponseBody } from 'src/interfaces/ResponseBody'
import { QueryMessagesDto } from './dto/QueryMessages.dto'
import { Message } from './messages.entity'
import { MessagesService } from './messages.service'

@Controller('messages')
export class MessagesController {
  private messagesService: MessagesService

  constructor (messagesService: MessagesService) {
    this.messagesService = messagesService
  }

  @Get()
  async queryMessages (
    @Req() request: Request,
    @Query() query: QueryMessagesDto
  ): Promise<ResponseBody<{ messages: Message[] }>> {
    const messages = await this.messagesService.queryMessages(
      query.page,
      query.perPages,
      {
        type: query.type !== 'all' ? query.type : undefined,
        status: query.status !== 'all' ? query.status : undefined
      }
    )

    return {
      success: true,
      data: {
        messages
      }
    }
  }
}
