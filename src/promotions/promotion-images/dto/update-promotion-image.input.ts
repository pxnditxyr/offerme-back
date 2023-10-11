import { CreatePromotionImageInput } from './create-promotion-image.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePromotionImageInput extends PartialType(CreatePromotionImageInput) {
  @Field(() => Int)
  id: number;
}
