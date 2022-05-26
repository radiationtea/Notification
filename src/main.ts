import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api/noti/v1')
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    whitelist: true
  }))

  const port = parseInt(process.env.SERVER_PORT) || 8080
  console.log(`Server is now online on http://localhost:${port}`)

  await app.listen(port)
}

bootstrap()
