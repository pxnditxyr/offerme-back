import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCompanyUserInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
