import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DiscountProduct {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
