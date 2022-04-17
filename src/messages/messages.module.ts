import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Messages } from './messages.entity'
import { MessagesService } from './messages.service'
import { MessagesController } from './messages.controller'
import { AuthModule } from 'src/auth/auth.module'
import { PermissionsModule } from 'src/permissions/permissions.module'
import { CategoriesModule } from 'src/categories/categories.module'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Messages]),
    AuthModule,
    CategoriesModule,
    PermissionsModule,
    UsersModule,
    CategoriesModule
  ],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
