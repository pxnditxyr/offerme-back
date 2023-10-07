import { Module } from '@nestjs/common'
import { SessionsService } from './sessions.service'
import { PrismaService } from '../../prisma'
import { SessionsResolver } from './sessions.resolver'

@Module({
  providers: [
    SessionsService,
    SessionsResolver,
    PrismaService,
  ],
  exports: [
    SessionsService
  ]
})
export class SessionsModule {}
