import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Message, MessageType } from './messages.entity'

@Injectable()
export class MessagesService {
  private messagesRepository: Repository<Message>

  constructor (@InjectRepository(Message) messagesRepository: Repository<Message>) {
    this.messagesRepository = messagesRepository
  }

  public queryMessages (page = 0, perPage = 10, filter?: {
    type?: MessageType
  }): Promise<Message[]> {
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

  public getMessage (id: number): Promise<Message> {
    return this.messagesRepository.findOne({ notiId: id })
  }
}
