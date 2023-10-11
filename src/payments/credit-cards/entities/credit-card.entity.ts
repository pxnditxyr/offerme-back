import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CreditCard {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
