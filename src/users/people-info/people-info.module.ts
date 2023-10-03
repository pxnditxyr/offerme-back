import { Module } from '@nestjs/common'
import { PeopleInfoService } from './people-info.service'
import { PeopleInfoResolver } from './people-info.resolver'
import { PrismaService } from '../../prisma/prisma.service'

@Module({
  providers: [
    PeopleInfoResolver,
    PeopleInfoService,
    PrismaService
  ],
})
export class PeopleInfoModule {}
