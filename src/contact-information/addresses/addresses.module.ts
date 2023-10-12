import { Module } from '@nestjs/common'
import { AddressesService } from './addresses.service'
import { AddressesResolver } from './addresses.resolver'
import { PrismaService } from 'src/prisma'

@Module({
  providers: [
    AddressesResolver,
    AddressesService,
    PrismaService,
  ],

  exports: [
    AddressesService,
  ]
})
export class AddressesModule {}
