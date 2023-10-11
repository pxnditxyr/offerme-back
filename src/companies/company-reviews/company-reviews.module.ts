import { Module } from '@nestjs/common';
import { CompanyReviewsService } from './company-reviews.service';
import { CompanyReviewsResolver } from './company-reviews.resolver';

@Module({
  providers: [CompanyReviewsResolver, CompanyReviewsService],
})
export class CompanyReviewsModule {}
