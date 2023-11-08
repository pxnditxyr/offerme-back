import { Module } from '@nestjs/common'
import { ManagementUsersService } from './management-users.service'
import { ManagementUsersResolver } from './management-users.resolver'
import { PeopleInfoModule, RolesModule, UserAvatarsModule, UsersModule } from 'src/users'
import { SubparametersModule } from 'src/parametrics'
import { AddressesModule, PhonesModule } from 'src/contact-information'
import { CreditCardsModule } from 'src/payments'
import { PrismaService } from 'src/prisma'

@Module({
  providers: [
    ManagementUsersResolver,
    ManagementUsersService,
    PrismaService
  ],
  imports: [
    PeopleInfoModule,
    UsersModule,
    SubparametersModule,
    RolesModule,
    UserAvatarsModule,
    PhonesModule,
    AddressesModule,
    CreditCardsModule
  ],
  exports: [ ManagementUsersService ]
})
export class ManagementUsersModule {}
