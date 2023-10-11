import { CreateCompanyReviewInput } from './create-company-review.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompanyReviewInput extends PartialType(CreateCompanyReviewInput) {
  @Field(() => Int)
  id: number;
}
