import { CreateCompanyUserInput } from './create-company-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompanyUserInput extends PartialType(CreateCompanyUserInput) {
  @Field(() => Int)
  id: number;
}
