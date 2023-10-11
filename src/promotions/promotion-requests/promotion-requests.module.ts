import { Module } from '@nestjs/common';
import { PromotionRequestsService } from './promotion-requests.service';
import { PromotionRequestsResolver } from './promotion-requests.resolver';

@Module({
  providers: [PromotionRequestsResolver, PromotionRequestsService],
})
export class PromotionRequestsModule {}
