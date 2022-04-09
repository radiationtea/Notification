import { Controller, Get } from '@nestjs/common'
import { ResponseBody } from 'src/interfaces/ResponseBody'
import { HealthDto } from './dto/health.dto'
import { HealthService } from './health.service'

@Controller('health')
export class HealthController {
  private healthService: HealthService

  constructor (healthService: HealthService) {
    this.healthService = healthService
  }

  @Get()
  async getHealth (): Promise<ResponseBody<HealthDto>> {
    return {
      success: true,
      data: await this.healthService.getHealth()
    }
  }
}
