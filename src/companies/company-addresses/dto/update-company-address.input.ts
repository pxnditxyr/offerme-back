import { CreateCompanyAddressInput } from './create-company-address.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompanyAddressInput extends PartialType(CreateCompanyAddressInput) {
  @Field(() => Int)
  id: number;
}
