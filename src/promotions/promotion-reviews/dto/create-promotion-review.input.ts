import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePromotionReviewInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
