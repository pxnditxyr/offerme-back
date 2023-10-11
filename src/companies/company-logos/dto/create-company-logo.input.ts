import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCompanyLogoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
