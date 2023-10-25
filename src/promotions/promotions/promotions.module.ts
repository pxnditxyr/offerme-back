import { Module } from '@nestjs/common'
import { PromotionsService } from './promotions.service'
import { PromotionsResolver } from './promotions.resolver'
import { PrismaService } from 'src/prisma'
import { SubparametersModule } from 'src/parametrics'
import { UsersModule } from 'src/users'
import { CompaniesModule } from 'src/companies'
import { PromotionPaymentsModule } from '../promotion-payments/promotion-payments.module'
import { PromotionRequestsModule } from '../promotion-requests/promotion-requests.module'

@Module({
  providers: [
    PromotionsResolver,
    PromotionsService,
    PrismaService
  ],
  imports: [
    SubparametersModule,
    UsersModule,
    CompaniesModule,
    PromotionPaymentsModule,
    PromotionRequestsModule
  ],
  exports: [
    PromotionsService
  ]
})
export class PromotionsModule {}
