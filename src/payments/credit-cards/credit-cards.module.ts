import { Module } from '@nestjs/common'
import { CreditCardsService } from './credit-cards.service'
import { CreditCardsResolver } from './credit-cards.resolver'
import { PrismaService } from 'src/prisma'
import { SubparametersModule } from 'src/parametrics'

@Module({
  providers: [
    CreditCardsResolver,
    CreditCardsService,
    PrismaService
  ],
  imports: [
    SubparametersModule
  ],
  exports: [
    CreditCardsService
  ]
})
export class CreditCardsModule {}
