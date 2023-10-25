import { Module } from '@nestjs/common'
import { DiscountProductsService } from './discount-products.service'
import { DiscountProductsResolver } from './discount-products.resolver'
import { PrismaService } from 'src/prisma'
import { ProductsModule } from 'src/products'
import { PromotionRequestsModule } from '../promotion-requests/promotion-requests.module'

@Module({
  providers: [
    DiscountProductsResolver,
    DiscountProductsService,
    PrismaService
  ],
  imports: [
    ProductsModule,
    PromotionRequestsModule,
  ],
  exports: [
    DiscountProductsService
  ]
})
export class DiscountProductsModule {}
