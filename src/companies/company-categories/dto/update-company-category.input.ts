import { CreateCompanyCategoryInput } from './create-company-category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompanyCategoryInput extends PartialType(CreateCompanyCategoryInput) {
  @Field(() => Int)
  id: number;
}
