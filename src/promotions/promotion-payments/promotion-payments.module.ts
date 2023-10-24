import { Module } from '@nestjs/common'
import { PromotionPaymentsService } from './promotion-payments.service'
import { PromotionPaymentsResolver } from './promotion-payments.resolver'
import { PrismaService } from 'src/prisma'
import { SubparametersModule } from 'src/parametrics'
import { PromotionRequestsModule } from '../promotion-requests/promotion-requests.module'
import { CreditCardsModule } from 'src/payments'

@Module({
  providers: [
    PromotionPaymentsResolver,
    PromotionPaymentsService,
    PrismaService
  ],
  imports: [
    SubparametersModule,
    PromotionRequestsModule,
    CreditCardsModule
  ],
  exports: [
    PromotionPaymentsService
  ]
})
export class PromotionPaymentsModule {}
