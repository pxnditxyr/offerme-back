import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCreditCardInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
