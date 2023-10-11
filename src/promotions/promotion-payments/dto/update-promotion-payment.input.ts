import { CreatePromotionPaymentInput } from './create-promotion-payment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePromotionPaymentInput extends PartialType(CreatePromotionPaymentInput) {
  @Field(() => Int)
  id: number;
}
