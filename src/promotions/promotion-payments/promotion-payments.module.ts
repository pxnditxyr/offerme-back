import { Module } from '@nestjs/common';
import { PromotionPaymentsService } from './promotion-payments.service';
import { PromotionPaymentsResolver } from './promotion-payments.resolver';

@Module({
  providers: [PromotionPaymentsResolver, PromotionPaymentsService],
})
export class PromotionPaymentsModule {}
