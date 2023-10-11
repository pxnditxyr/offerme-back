import { Module } from '@nestjs/common';
import { PromotionTargetProductsService } from './promotion-target-products.service';
import { PromotionTargetProductsResolver } from './promotion-target-products.resolver';

@Module({
  providers: [PromotionTargetProductsResolver, PromotionTargetProductsService],
})
export class PromotionTargetProductsModule {}
