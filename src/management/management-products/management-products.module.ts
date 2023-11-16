import { Module } from '@nestjs/common';
import { ManagementProductsService } from './management-products.service';
import { ManagementProductsResolver } from './management-products.resolver';
import { ProductCategoriesModule, ProductsModule } from 'src/products';
import { PromotionTargetProductsModule } from 'src/promotions';

@Module({
  providers: [
    ManagementProductsResolver,
    ManagementProductsService
  ],
  imports: [
    ProductsModule,
    ProductCategoriesModule,
    PromotionTargetProductsModule,
  ],
  exports: [ ManagementProductsService ]
})
export class ManagementProductsModule {}
