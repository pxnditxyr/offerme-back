import { Module } from '@nestjs/common'
import { RolesService } from './roles.service'
import { RolesResolver } from './roles.resolver'
import { PrismaService } from '../../prisma'

@Module({
  providers: [
    RolesResolver,
    RolesService,
    PrismaService
  ],
  exports: [
    RolesService
  ]
})

export class RolesModule {}
