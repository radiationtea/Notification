import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Message } from './messages.entity'
import { MessagesService } from './messages.service'
import { MessagesController } from './messages.controller'
import { AuthModule } from 'src/auth/auth.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [TypeOrmModule.forFeature([Message]), AuthModule],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
