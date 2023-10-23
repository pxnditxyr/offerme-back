import { Module } from '@nestjs/common'
import { UserAddressesService } from './user-addresses.service'
import { UserAddressesResolver } from './user-addresses.resolver'
import { PrismaService } from 'src/prisma'
import { AddressesModule } from 'src/contact-information'
import { UsersModule } from '../users/users.module'

@Module({
  providers: [
    UserAddressesResolver,
    UserAddressesService,
    PrismaService
  ],
  imports: [
    AddressesModule,
    UsersModule
  ],
  exports: [
    UserAddressesService
  ]
})
export class UserAddressesModule {}
