import { CreateCodePromotionDiscountProductInput } from './create-code-promotion-discount-product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCodePromotionDiscountProductInput extends PartialType(CreateCodePromotionDiscountProductInput) {
  @Field(() => Int)
  id: number;
}
