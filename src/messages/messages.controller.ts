import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import { ServerAuthGuard } from 'src/auth/server-auth.guard'
import { ResponseBody } from 'src/interfaces/ResponseBody'
import { Require } from 'src/permissions/permissions.decorator'
import { PermissionsGuard } from 'src/permissions/permissions.guard'
import { CreateMessageDto } from './dto/CreateMessage.dto'
import { GetMessageDto } from './dto/GetMessage.dto'
import { QueryMessagesDto } from './dto/QueryMessages.dto'
import { Messages } from './messages.entity'
import { MessagesService } from './messages.service'

@Controller('messages')
export class MessagesController {
  private messagesService: MessagesService

  constructor (messagesService: MessagesService) {
    this.messagesService = messagesService
  }

  @Get()
  @Require('MANAGE_NOTIFICATIONS')
  @UseGuards(PermissionsGuard)
  async queryMessages (
    @Query('per_pages') perPages: number,
    @Query() query: QueryMessagesDto
  ): Promise<ResponseBody<{ messages: Messages[] }>> {
    const messages = await this.messagesService.queryMessages(
      query.page,
      perPages,
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
    return {
      success: true,
      data: {
        id: await this.messagesService.createMessage(body.type, body.subcategory, body.user)
      }
    }
  }

  @Get(':id')
  @Require('MANAGE_NOTIFICATIONS')
  @UseGuards(PermissionsGuard)
  async getMessage (
    @Param() params: GetMessageDto
  ): Promise<ResponseBody<{message: Messages}>> {
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
