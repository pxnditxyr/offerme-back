import { CreatePromotionStatusInput } from './create-promotion-status.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePromotionStatusInput extends PartialType(CreatePromotionStatusInput) {
  @Field(() => Int)
  id: number;
}
