import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCompanyAddressInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
