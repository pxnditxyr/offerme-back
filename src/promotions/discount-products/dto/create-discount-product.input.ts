import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDiscountProductInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
