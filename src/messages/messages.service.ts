import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Message, MessageStatus, MessageType } from './messages.entity'

@Injectable()
export class MessagesService {
  private messagesRepository: Repository<Message>

  constructor (@InjectRepository(Message) messagesRepository: Repository<Message>) {
    this.messagesRepository = messagesRepository
  }

  public queryMessages (page = 0, perPage = 10, filter?: {
    type?: MessageType,
    status?: MessageStatus
  }): Promise<Message[]> {
    return this.messagesRepository.find({
      skip: page * perPage,
      take: page,
      where: {
        type: filter?.type,
        status: filter?.status
      }
    })
  }

  public getMessage (id: string): Promise<Message> {
    return this.messagesRepository.findOne({ id })
  }

  public async cancelMessage (id: string): Promise<void> {
    await this.setFailed(id, '관리자가 메시지 전송을 취소하였습니다.')
  }

  private async setProcessingLock (id: string): Promise<void> {
    await this.messagesRepository.update({ id }, {
      status: 'processing'
    })
  }

  private async setResolved (id: string): Promise<void> {
    await this.messagesRepository.update({ id }, {
      status: 'resolved',
      resolvedAt: new Date()
    })
  }

  private async setFailed (id: string, reason: string): Promise<void> {
    await this.messagesRepository.update({ id }, {
      status: 'failed',
      errors: reason
    })
  }
}
