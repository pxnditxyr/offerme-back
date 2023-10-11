import { Module } from '@nestjs/common';
import { PromotionStatusService } from './promotion-status.service';
import { PromotionStatusResolver } from './promotion-status.resolver';

@Module({
  providers: [PromotionStatusResolver, PromotionStatusService],
})
export class PromotionStatusModule {}
