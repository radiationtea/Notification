import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MessagesModule } from './messages/messages.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    MessagesModule
  ]
})
export class AppModule {}
