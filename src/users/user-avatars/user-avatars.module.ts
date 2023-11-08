import { Module } from '@nestjs/common'
import { UserAvatarsService } from './user-avatars.service'
import { UserAvatarsResolver } from './user-avatars.resolver'
import { PrismaService } from 'src/prisma'

@Module({
  providers: [
    UserAvatarsResolver,
    UserAvatarsService,
    PrismaService
  ],
  exports: [ UserAvatarsService ]
})
export class UserAvatarsModule {}
