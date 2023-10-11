import { Module } from '@nestjs/common';
import { PromotionImagesService } from './promotion-images.service';
import { PromotionImagesResolver } from './promotion-images.resolver';

@Module({
  providers: [PromotionImagesResolver, PromotionImagesService],
})
export class PromotionImagesModule {}
