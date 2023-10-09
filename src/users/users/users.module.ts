import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { PrismaService } from '../../prisma'
import { RolesModule } from '../roles/roles.module'

@Module({
  providers: [
    UsersResolver,
    UsersService,
    PrismaService
  ],
  imports: [
    RolesModule
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
