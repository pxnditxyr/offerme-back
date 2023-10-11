import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PromotionRequest {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
