import { Module } from '@nestjs/common';
import { CodePromotionDiscountProductsService } from './code-promotion-discount-products.service';
import { CodePromotionDiscountProductsResolver } from './code-promotion-discount-products.resolver';
import { PrismaService } from 'src/prisma';
import { DiscountProductsModule } from '../discount-products/discount-products.module';

@Module({
  providers: [
    CodePromotionDiscountProductsResolver,
    CodePromotionDiscountProductsService,
    PrismaService
  ],
  imports: [
    DiscountProductsModule
  ],
  exports: [
    CodePromotionDiscountProductsService
  ]
})
export class CodePromotionDiscountProductsModule {}
