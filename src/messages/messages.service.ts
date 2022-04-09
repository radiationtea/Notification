import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Message } from './messages.entity'

@Injectable()
export class MessagesService {
  private messagesRepository: Repository<Message>

  constructor (@InjectRepository(Message) messagesRepository: Repository<Message>) {
    this.messagesRepository = messagesRepository
  }
}
