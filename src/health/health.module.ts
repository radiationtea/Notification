import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Message } from 'src/messages/messages.entity'
import { HealthController } from './health.controller'
import { HealthService } from './health.service'

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [HealthService],
  controllers: [HealthController]
})
export class HealthModule {}
