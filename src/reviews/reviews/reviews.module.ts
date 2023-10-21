import { Module } from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import { ReviewsResolver } from './reviews.resolver'
import { PrismaService } from 'src/prisma'

@Module({
  providers: [
    ReviewsResolver,
    ReviewsService,
    PrismaService
  ],
  exports: [
    ReviewsService
  ]
})
export class ReviewsModule {}
