import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CategoryImage {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
