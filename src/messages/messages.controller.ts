import { Controller, Delete, Get, Param, Query, Req } from '@nestjs/common'
import { IsUUID } from 'class-validator'
import { Request } from 'express'
import { ResponseBody } from 'src/interfaces/ResponseBody'
import { CancelMessageDto } from './dto/CancelMessage.dto'
import { GetMessageDto } from './dto/GetMessage.dto'
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

  @Get(':id')
  async getMessage (
    @Param() params: GetMessageDto
  ): Promise<ResponseBody<{message: Message}>> {
    const message = await this.messagesService.getMessage(params.id)

    if (!message) {
      return {
        success: true,
        error: `message id ${params.id} not found`
      }
    }

    return {
      success: true,
      data: {
        message
      }
    }
  }

  @Delete(':id')
  async cancelMessage (
    @Param() params: CancelMessageDto
  ): Promise<ResponseBody<{id: string}>> {
    await this.messagesService.cancelMessage(params.id)

    return {
      success: true,
      data: {
        id: params.id
      }
    }
  }
}
