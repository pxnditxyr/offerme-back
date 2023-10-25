import { Module } from '@nestjs/common'
import { PromotionStatusService } from './promotion-status.service'
import { PromotionStatusResolver } from './promotion-status.resolver'
import { PrismaService } from 'src/prisma'
import { PromotionRequestsModule } from '../promotion-requests/promotion-requests.module'

@Module({
  providers: [
    PromotionStatusResolver,
    PromotionStatusService,
    PrismaService
  ],
  imports: [
    PromotionRequestsModule,
  ],
  exports: [
    PromotionStatusService
  ]
})
export class PromotionStatusModule {}
