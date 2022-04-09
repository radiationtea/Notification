import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import 'dotenv/config'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  await app.listen(parseInt(process.env.SERVER_PORT) || 8080)
}

bootstrap()