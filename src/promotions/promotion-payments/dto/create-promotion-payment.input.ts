import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePromotionPaymentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
