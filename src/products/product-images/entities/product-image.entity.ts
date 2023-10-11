import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ProductImage {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
