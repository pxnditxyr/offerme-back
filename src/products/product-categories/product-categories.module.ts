import { Module } from '@nestjs/common'
import { ProductCategoriesService } from './product-categories.service'
import { ProductCategoriesResolver } from './product-categories.resolver'
import { PrismaService } from 'src/prisma'
import { ProductsModule } from '../products/products.module'
import { CategoriesModule } from 'src/categories'

@Module({
  providers: [
    ProductCategoriesResolver,
    ProductCategoriesService,
    PrismaService
  ],
  imports: [
    ProductsModule,
    CategoriesModule
  ],
  exports: [
    ProductCategoriesService
  ]
})
export class ProductCategoriesModule {}
