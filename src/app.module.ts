import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { I18nModule } from 'nestjs-i18n'
import * as path from 'path'
import { AuthMiddleware } from './auth/auth.middleware'
import { HealthModule } from './health/health.module'
import { MessagesModule } from './messages/messages.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: ['.env']
    }),
    TypeOrmModule.forRoot(),
    I18nModule.forRoot({
      fallbackLanguage: 'ko',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true
      }
    }),
    MessagesModule,
    HealthModule
  ]
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('messages')
  }
}
