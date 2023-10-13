import { Module } from '@nestjs/common'
import { CategoryImagesService } from './category-images.service'
import { CategoryImagesResolver } from './category-images.resolver'
import { PrismaService } from 'src/prisma'
import { CategoriesModule } from '../categories/categories.module'

@Module({
  providers: [
    CategoryImagesResolver,
    CategoryImagesService,
    PrismaService
  ],
  imports: [
    CategoriesModule
  ],
  exports: [
    CategoryImagesService
  ]
})
export class CategoryImagesModule {}
