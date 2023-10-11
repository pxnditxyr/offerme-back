import { Module } from '@nestjs/common';
import { CodePromotionDiscountProductsService } from './code-promotion-discount-products.service';
import { CodePromotionDiscountProductsResolver } from './code-promotion-discount-products.resolver';

@Module({
  providers: [CodePromotionDiscountProductsResolver, CodePromotionDiscountProductsService],
})
export class CodePromotionDiscountProductsModule {}
