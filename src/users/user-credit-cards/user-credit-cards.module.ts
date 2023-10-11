import { Module } from '@nestjs/common';
import { UserCreditCardsService } from './user-credit-cards.service';
import { UserCreditCardsResolver } from './user-credit-cards.resolver';

@Module({
  providers: [UserCreditCardsResolver, UserCreditCardsService],
})
export class UserCreditCardsModule {}
