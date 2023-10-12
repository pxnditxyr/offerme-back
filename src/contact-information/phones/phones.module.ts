import { Module } from '@nestjs/common'
import { PhonesService } from './phones.service'
import { PhonesResolver } from './phones.resolver'
import { PrismaService } from 'src/prisma'

@Module({
  providers: [
    PhonesResolver,
    PhonesService,
    PrismaService
  ],
  exports: [
    PhonesService
  ]
})
export class PhonesModule {}
