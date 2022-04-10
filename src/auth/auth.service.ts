import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { lastValueFrom, map } from 'rxjs'
import { AuthServerPermCheckRes } from './interfaces/authserver.dto'

@Injectable()
export class AuthService {
  private httpSerivce: HttpService
  private authServer: string

  constructor (httpService: HttpService, configService: ConfigService) {
    this.httpSerivce = httpService

    this.authServer =
      configService.get<string>('AUTH_SERVER_URL', 'http://localhost:8081')
  }

  public async checkPermissionForUser (session: string, permission: string) {
    const url = `${this.authServer}/api/users/permissions?perm=${permission}`
    const request =
      this.httpSerivce.get<AuthServerPermCheckRes>(url, {
        headers: { Cookies: `SESSION_TOKEN=${session}` }
      }).pipe(map((r) => r.data))

    return (await lastValueFrom(request)).data.hasPermission
  }
}
