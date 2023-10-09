import { Module } from '@nestjs/common'
import { PeopleInfoService } from './people-info.service'
import { PeopleInfoResolver } from './people-info.resolver'
import { PrismaService } from '../../prisma'
import { SubparametersModule } from '../../parametrics'

@Module({
  providers: [
    PeopleInfoResolver,
    PeopleInfoService,
    PrismaService
  ],
  imports: [
    SubparametersModule
  ],
  exports: [
    PeopleInfoService
  ]
})
export class PeopleInfoModule {}
