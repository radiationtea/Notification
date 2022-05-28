import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Subcategories } from '../categories/categories.entities'
import { CategoriesService } from 'src/categories/categories.service'
import { Users } from 'src/users/users.entity'
import { UsersService } from 'src/users/users.service'
import { Repository } from 'typeorm'
import { Messages, MessageType } from './messages.entity'
import { AligoService } from 'src/aligo/aligo.service'

@Injectable()
export class MessagesService {
  private messagesRepository: Repository<Messages>
  private categoriesService: CategoriesService
  private usersService: UsersService
  private aligoService: AligoService

  constructor (
    @InjectRepository(Messages)
      messagesRepository: Repository<Messages>,
      categoriesService: CategoriesService,
      usersService: UsersService,
      aligoService: AligoService
  ) {
    this.messagesRepository = messagesRepository
    this.categoriesService = categoriesService
    this.usersService = usersService
    this.aligoService = aligoService
  }

  public queryMessages (page = 0, perPage = 10, filter?: {
    type?: MessageType
  }): Promise<Messages[]> {
    return this.messagesRepository.find({
      skip: page * perPage,
      take: perPage,
      where: filter.type ? filter : undefined
    })
  }

  public async createMessage (type: MessageType, subcategory: number, userId: string) {
    const category =
      await this.categoriesService.getSubcategory(subcategory)

    const student = await this.usersService.getUser(userId)
    const manager = category.parent.manageUser

    const user =
      type === 'submitted'
        ? manager
        : student

    const content = this.getMessageContent(type, student, category)

    const data = await this.messagesRepository.insert({
      type,
      phone: user.phoneNumber,
      content,
      requestedAt: new Date()
    })

    this.aligoService.sendMessage(content, user.phoneNumber)
      .then((result) => {
        this.messagesRepository.update(data.generatedMaps[0].msgId, {
          errors: result.result_code < 0 ? result.message : undefined,
          resolvedAt: new Date()
        })
      })

    return data.generatedMaps[0].msgId
  }

  public getMessage (id: number): Promise<Messages> {
    return this.messagesRepository.findOne({ msgId: id })
  }

  private getMessageContent (type: MessageType, student: Users, subcate: Subcategories) {
    if (type === 'submitted') {
      return `[3C인증제]\n${student.name} 학생이 "${subcate.parent.label} - ${subcate.label}" 승인요청을 업로드 했습니다.\n승인 처리: https://3c.gbsw.hs.kr`
    }

    if (type === 'accepted') {
      return `[3C인증제]\n${student.name} 학생이 업로드한 "${subcate.parent.label} - ${subcate.label}" 승인요청이 승인되었습니다.\n점수 확인: https://3c.gbsw.hs.kr`
    }

    if (type === 'rejected') {
      return `[3C인증제]\n${student.name} 학생이 업로드한 "${subcate.parent.label} - ${subcate.label}" 승인요청이 거부되었습니다.\n거부 사유 확인: https://3c.gbsw.hs.kr`
    }
  }
}
