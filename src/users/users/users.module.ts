import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { PrismaService } from '../../prisma'
import { RolesModule } from '../roles/roles.module'
import { SubparametersModule } from 'src/parametrics'

@Module({
  providers: [
    UsersResolver,
    UsersService,
    PrismaService
  ],
  imports: [
    RolesModule,
    SubparametersModule
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
