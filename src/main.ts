import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    whitelist: true
  }))

  await app.listen(parseInt(process.env.SERVER_PORT) || 8080)
}

bootstrap()
