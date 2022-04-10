import { HttpModule } from '@nestjs/axios'
import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthService } from './auth.service'
import { ClientAuthGuard } from './client-auth.guard'

@Global()
@Module({
  imports: [
    HttpModule,
    ConfigModule
  ],
  providers: [AuthService, ClientAuthGuard],
  exports: [AuthService, ClientAuthGuard]
})
export class AuthModule {}
