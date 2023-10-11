import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePromotionRequestInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
