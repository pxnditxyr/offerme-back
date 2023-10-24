import { Module } from '@nestjs/common'
import { PromotionRequestsService } from './promotion-requests.service'
import { PromotionRequestsResolver } from './promotion-requests.resolver'
import { PrismaService } from 'src/prisma'
import { CompaniesModule } from 'src/companies'
import { SubparametersModule } from 'src/parametrics'

@Module({
  providers: [
    PromotionRequestsResolver,
    PromotionRequestsService,
    PrismaService
  ],
  imports: [
    SubparametersModule,
    CompaniesModule
  ],
  exports: [
    PromotionRequestsService
  ]
})
export class PromotionRequestsModule {}
