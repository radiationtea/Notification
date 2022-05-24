import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Client as AligoClient } from 'aligo-smartsms'

@Injectable()
export class AligoService {
  private client: AligoClient

  constructor (configService: ConfigService) {
    this.client = new AligoClient({
      key: configService.get<string>('ALIGO_KEY', ''),
      user_id: configService.get<string>('ALIGO_USER_ID', ''),
      sender: configService.get<string>('ALIGO_SENDER', '')
    })
  }

  public sendMessage (content: string, phoneNumber: string) {
    return this.client.sendMessages({
      msg: content,
      msg_type: 'SMS',
      receiver: phoneNumber
    })
  }
}
