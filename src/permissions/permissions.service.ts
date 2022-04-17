import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersService } from 'src/users/users.service'
import { Raw, Repository } from 'typeorm'
import { Permissions, Roles } from './permissions.entities'

@Injectable()
export class PermissionsService {
  private permissions: Repository<Permissions>
  private roles: Repository<Roles>
  private usersService: UsersService

  constructor (
   @InjectRepository(Permissions) permissions: Repository<Permissions>,
   @InjectRepository(Roles) roles: Repository<Roles>,
     usersService: UsersService
  ) {
    this.usersService = usersService
    this.permissions = permissions
    this.roles = roles
  }

  public async hasPermission (userId: string, label: string) {
    const roles = await this.listRolesByUserId(userId)
    if (!roles) return null

    const perm = await this.getPermByLabel(label)
    if (!perm) return null

    const found = roles.find((r) => r.perms & (1 << perm.permId))
    return !!found
  }

  private getPermByLabel (label: string) {
    return this.permissions.findOne({
      where: { label }
    })
  }

  private async listRolesByUserId (userId: string) {
    const userData = await this.usersService.getUser(userId)
    if (!userData) return null

    return this.roles.find({
      where: {
        roleId: Raw((id) => `${userData.roles} & (1 << ${id})`)
      }
    })
  }
}
