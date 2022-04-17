import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CategoriesService } from 'src/categories/categories.service'
import { UsersService } from 'src/users/users.service'
import { Repository } from 'typeorm'
import { Messages, MessageType } from './messages.entity'

@Injectable()
export class MessagesService {
  private messagesRepository: Repository<Messages>
  private categoriesService: CategoriesService
  private usersService: UsersService

  constructor (
    @InjectRepository(Messages)
      messagesRepository: Repository<Messages>,
      categoriesService: CategoriesService
  ) {
    this.messagesRepository = messagesRepository
    this.categoriesService = categoriesService
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

  public async createMessage (type: MessageType, subcategory: number, userId: string) {
    const category =
      await this.categoriesService.getSubcategory(subcategory)

    const user =
      type === 'submitted'
        ? category.parent.manageUser
        : await this.usersService.getUser(userId)

    const data = await this.messagesRepository.insert({
      type,
      userId: user.userId,
      requestedAt: Date.now()
    })

    return data.generatedMaps[0].notiId
  }

  public getMessage (id: number): Promise<Messages> {
    return this.messagesRepository.findOne({ notiId: id })
  }
}
