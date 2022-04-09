import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    whitelist: true
  }))

  await app.listen(parseInt(process.env.SERVER_PORT) || 8080)
}

bootstrap()
