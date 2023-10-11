import { CreatePromotionReviewInput } from './create-promotion-review.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePromotionReviewInput extends PartialType(CreatePromotionReviewInput) {
  @Field(() => Int)
  id: number;
}
