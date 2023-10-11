import { CreateCompanyPhoneInput } from './create-company-phone.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompanyPhoneInput extends PartialType(CreateCompanyPhoneInput) {
  @Field(() => Int)
  id: number;
}
