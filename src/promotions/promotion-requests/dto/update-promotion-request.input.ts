import { CreatePromotionRequestInput } from './create-promotion-request.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePromotionRequestInput extends PartialType(CreatePromotionRequestInput) {
  @Field(() => Int)
  id: number;
}
