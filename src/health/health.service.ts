import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { HealthDto } from './dto/health.dto'
import { Message } from '../messages/messages.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class HealthService {
  private messagesRepository: Repository<Message>

  constructor (
    @InjectRepository(Message)
      messagesRepository: Repository<Message>
  ) {
    this.messagesRepository = messagesRepository
  }

  async getHealth (): Promise<HealthDto> {
    const pending = await this.messagesRepository.count({ where: { status: 'pending' } })
    const processing = await this.messagesRepository.count({ where: { status: 'processing' } })
    const resolved = await this.messagesRepository.count({ where: { status: 'resolved' } })
    const failed = await this.messagesRepository.count({ where: { status: 'failed' } })
    const lastAt = await this.messagesRepository.findOne({
      where: {
        status: 'resolved'
      },
      order: {
        resolvedAt: 'DESC'
      }
    })

    return {
      subject: '3C-Notification',
      uptime: Math.round(process.uptime() * 1000),
      timestamp: Date.now(),
      messages: {
        pending,
        processing,
        resolved,
        failed,
        lastAt: lastAt?.resolvedAt?.getDate?.() || null
      }
    }
  }
}
