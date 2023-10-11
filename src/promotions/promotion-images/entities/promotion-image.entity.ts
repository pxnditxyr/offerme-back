import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PromotionImage {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
