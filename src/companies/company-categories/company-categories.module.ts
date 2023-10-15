import { Module } from '@nestjs/common'
import { CompanyCategoriesService } from './company-categories.service'
import { CompanyCategoriesResolver } from './company-categories.resolver'
import { PrismaService } from 'src/prisma'
import { CategoriesModule } from 'src/categories'
import { CompaniesModule } from '../companies/companies.module'

@Module({
  providers: [
    CompanyCategoriesResolver,
    CompanyCategoriesService,
    PrismaService,
  ],
  imports: [
    CompaniesModule,
    CategoriesModule,
  ],
  exports: [
    CompanyCategoriesService,
  ]
})
export class CompanyCategoriesModule {}
