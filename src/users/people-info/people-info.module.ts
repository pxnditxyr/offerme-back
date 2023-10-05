import { Module } from '@nestjs/common'
import { PeopleInfoService } from './people-info.service'
import { PeopleInfoResolver } from './people-info.resolver'
import { PrismaService } from '../../prisma/prisma.service'
import { SubparametersModule } from 'src/parametrics'

@Module({
  providers: [
    PeopleInfoResolver,
    PeopleInfoService,
    PrismaService
  ],
  imports: [
    SubparametersModule
  ]
})
export class PeopleInfoModule {}
