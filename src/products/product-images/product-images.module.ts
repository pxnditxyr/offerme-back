import { Module } from '@nestjs/common'
import { ProductImagesService } from './product-images.service'
import { ProductImagesResolver } from './product-images.resolver'
import { PrismaService } from 'src/prisma'
import { ProductsModule } from '../products/products.module'

@Module({
  providers: [
    ProductImagesResolver,
    ProductImagesService,
    PrismaService
  ],
  imports: [
    ProductsModule
  ],
  exports: [
    ProductImagesService
  ]
})
export class ProductImagesModule {}
