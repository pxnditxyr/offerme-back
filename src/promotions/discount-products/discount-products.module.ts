import { Module } from '@nestjs/common';
import { DiscountProductsService } from './discount-products.service';
import { DiscountProductsResolver } from './discount-products.resolver';

@Module({
  providers: [DiscountProductsResolver, DiscountProductsService],
})
export class DiscountProductsModule {}
