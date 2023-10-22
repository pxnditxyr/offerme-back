import { Module } from '@nestjs/common'
import { UserPhonesService } from './user-phones.service'
import { UserPhonesResolver } from './user-phones.resolver'
import { PrismaService } from 'src/prisma'
import { UsersModule } from '../users/users.module'
import { PhonesModule } from 'src/contact-information'

@Module({
  providers: [
    UserPhonesResolver,
    UserPhonesService,
    PrismaService,
  ],
  imports: [
    UsersModule,
    PhonesModule
  ],
  exports: [
    UserPhonesService
  ],
})
export class UserPhonesModule {}
