import { Module } from '@nestjs/common'
import { PromotionImagesService } from './promotion-images.service'
import { PromotionImagesResolver } from './promotion-images.resolver'
import { PrismaService } from 'src/prisma'
import { PromotionRequestsModule } from '../promotion-requests/promotion-requests.module'

@Module({
  providers: [
    PromotionImagesResolver,
    PromotionImagesService,
    PrismaService
  ],
  imports: [
    PromotionRequestsModule,
  ],
  exports: [
    PromotionImagesService
  ]
})
export class PromotionImagesModule {}
