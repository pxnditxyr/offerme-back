import { CreateDiscountProductInput } from './create-discount-product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDiscountProductInput extends PartialType(CreateDiscountProductInput) {
  @Field(() => Int)
  id: number;
}
