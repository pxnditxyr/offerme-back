import { Module } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CommentsResolver } from './comments.resolver'
import { PrismaService } from 'src/prisma'
import { ReviewsModule } from '../reviews/reviews.module'

@Module({
  providers: [
    CommentsResolver,
    CommentsService,
    PrismaService,
  ],
  imports: [
    ReviewsModule
  ],
  exports: [
    CommentsService
  ]
})
export class CommentsModule {}
