import { Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsResolver } from './promotions.resolver';

@Module({
  providers: [
    PromotionsResolver,
    PromotionsService
  ],

  exports: [
    PromotionsService
  ]
})
export class PromotionsModule {}
