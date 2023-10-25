import { Module } from '@nestjs/common'
import { PromotionTargetProductsService } from './promotion-target-products.service'
import { PromotionTargetProductsResolver } from './promotion-target-products.resolver'
import { PrismaService } from 'src/prisma'
import { PromotionRequestsModule } from '../promotion-requests/promotion-requests.module'
import { ProductsModule } from 'src/products'

@Module({
  providers: [
    PromotionTargetProductsResolver,
    PromotionTargetProductsService,
    PrismaService
  ],
  imports: [
    PromotionRequestsModule,
    ProductsModule
  ],
  exports: [
    PromotionTargetProductsService
  ]
})
export class PromotionTargetProductsModule {}
