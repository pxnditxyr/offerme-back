import { CreatePromotionTargetProductInput } from './create-promotion-target-product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePromotionTargetProductInput extends PartialType(CreatePromotionTargetProductInput) {
  @Field(() => Int)
  id: number;
}
