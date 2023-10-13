import { Module } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesResolver } from './categories.resolver'
import { PrismaService } from 'src/prisma'

@Module({
  providers: [
    CategoriesResolver,
    CategoriesService,
    PrismaService
  ],

  exports: [
    CategoriesService
  ]
})
export class CategoriesModule {}
