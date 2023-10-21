import { Module } from '@nestjs/common'
import { PromotionReviewsService } from './promotion-reviews.service'
import { PromotionReviewsResolver } from './promotion-reviews.resolver'
import { PrismaService } from 'src/prisma'
import { PromotionsModule } from 'src/promotions'
import { ReviewsModule } from '../reviews/reviews.module'

@Module({
  providers: [
    PromotionReviewsResolver,
    PromotionReviewsService,
    PrismaService,
  ],
  imports: [
    PromotionsModule,
    ReviewsModule,
  ],
  exports: [
    PromotionReviewsModule
  ]
})
export class PromotionReviewsModule {}
