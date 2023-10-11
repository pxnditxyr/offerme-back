import { CreateCategoryImageInput } from './create-category-image.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryImageInput extends PartialType(CreateCategoryImageInput) {
  @Field(() => Int)
  id: number;
}
