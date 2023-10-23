import { Module } from '@nestjs/common'
import { UserCreditCardsService } from './user-credit-cards.service'
import { UserCreditCardsResolver } from './user-credit-cards.resolver'
import { PrismaService } from 'src/prisma'
import { CreditCardsModule } from 'src/payments'
import { UsersModule } from '../users/users.module'

@Module({
  providers: [
    UserCreditCardsResolver,
    UserCreditCardsService,
    PrismaService
  ],
  imports: [
    CreditCardsModule,
    UsersModule
  ],
  exports: [
    UserCreditCardsService
  ]
})
export class UserCreditCardsModule {}
