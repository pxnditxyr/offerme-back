import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserCreditCardInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
