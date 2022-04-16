import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Permissions, Roles, Users } from './permissions.entities'
import { PermissionsGuard } from './permissions.guard'
import { PermissionsService } from './permissions.service'

@Module({
  imports: [TypeOrmModule.forFeature([Permissions, Users, Roles])],
  providers: [PermissionsGuard, PermissionsService],
  exports: [PermissionsGuard, PermissionsService]
})
export class PermissionsModule {}
