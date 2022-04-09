import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HealthModule } from './health/health.module'
import { MessagesModule } from './messages/messages.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    MessagesModule,
    HealthModule
  ]
})
export class AppModule {}
