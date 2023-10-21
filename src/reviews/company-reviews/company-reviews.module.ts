import { Module } from '@nestjs/common'
import { CompanyReviewsService } from './company-reviews.service'
import { CompanyReviewsResolver } from './company-reviews.resolver'
import { ReviewsModule } from '../reviews/reviews.module'
import { CompaniesModule } from 'src/companies'
import { PrismaService } from 'src/prisma'

@Module({
  providers: [
    CompanyReviewsResolver,
    CompanyReviewsService,
    PrismaService
  ],
  imports: [
    ReviewsModule,
    CompaniesModule
  ],
})
export class CompanyReviewsModule {}
