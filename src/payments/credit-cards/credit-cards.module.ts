import { Module } from '@nestjs/common';
import { CreditCardsService } from './credit-cards.service';
import { CreditCardsResolver } from './credit-cards.resolver';

@Module({
  providers: [CreditCardsResolver, CreditCardsService],
})
export class CreditCardsModule {}
