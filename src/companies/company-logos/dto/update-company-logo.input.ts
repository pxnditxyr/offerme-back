import { CreateCompanyLogoInput } from './create-company-logo.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompanyLogoInput extends PartialType(CreateCompanyLogoInput) {
  @Field(() => Int)
  id: number;
}
