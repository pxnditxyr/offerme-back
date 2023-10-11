import { Module } from '@nestjs/common';
import { PromotionReviewsService } from './promotion-reviews.service';
import { PromotionReviewsResolver } from './promotion-reviews.resolver';

@Module({
  providers: [PromotionReviewsResolver, PromotionReviewsService],
})
export class PromotionReviewsModule {}
