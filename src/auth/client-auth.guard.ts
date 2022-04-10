import { Request } from 'express'
import { AuthService } from './auth.service'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class ClientAuthGuard implements CanActivate {
  private authService: AuthService

  constructor (authService: AuthService) {
    this.authService = authService
  }

  public canActivate (context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    return this.hasPermission(request)
  }

  private async hasPermission (request: Request): Promise<boolean> {
    const sessionToken = request.cookies.SESSION_TOKEN

    if (!sessionToken) return false

    return await this.authService.checkPermissionForUser(sessionToken, 'MANAGE_NOTIFICATION')
  }
}
