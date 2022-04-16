import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Messages, MessageType } from './messages.entity'

@Injectable()
export class MessagesService {
  private messagesRepository: Repository<Messages>

  constructor (@InjectRepository(Messages) messagesRepository: Repository<Messages>) {
    this.messagesRepository = messagesRepository
  }

  public queryMessages (page = 0, perPage = 10, filter?: {
    type?: MessageType
  }): Promise<Messages[]> {
    return this.messagesRepository.find({
      skip: page * perPage,
      take: page,
      where: {
        type: filter?.type
      }
    })
  }

  public async createMessage (type: MessageType, subcategory: number, user: string) {
    // TODO impl
    return 1
  }

  public getMessage (id: number): Promise<Messages> {
    return this.messagesRepository.findOne({ notiId: id })
  }
}
