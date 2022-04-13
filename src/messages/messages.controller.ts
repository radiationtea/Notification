import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import { ClientAuthGuard } from 'src/auth/client-auth.guard'
import { ServerAuthGuard } from 'src/auth/server-auth.guard'
import { ResponseBody } from 'src/interfaces/ResponseBody'
import { CreateMessageDto } from './dto/CreateMessage.dto'
import { GetMessageDto } from './dto/GetMessage.dto'
import { QueryMessagesDto } from './dto/QueryMessages.dto'
import { Message } from './messages.entity'
import { MessagesService } from './messages.service'

@Controller('messages')
@UseGuards(ClientAuthGuard)
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
        type: query.type !== 'all' ? query.type : undefined
      }
    )

    return {
      success: true,
      data: {
        messages
      }
    }
  }

  @Post()
  @UseGuards(ServerAuthGuard)
  async createMessage (
    @Body() body: CreateMessageDto
  ): Promise<ResponseBody<{id: number}>> {
    const id = await this.messagesService.createMessage(body.type, body.subcategory, body.user)
    // TODO Impl
    //
    return {
      success: true,
      data: {
        id
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
        success: false,
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
}
