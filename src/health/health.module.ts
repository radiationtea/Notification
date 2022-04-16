import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Messages } from 'src/messages/messages.entity'
import { HealthController } from './health.controller'
import { HealthService } from './health.service'

@Module({
  imports: [TypeOrmModule.forFeature([Messages])],
  providers: [HealthService],
  controllers: [HealthController]
})
export class HealthModule {}
