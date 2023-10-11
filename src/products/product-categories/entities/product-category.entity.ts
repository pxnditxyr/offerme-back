import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ProductCategory {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
