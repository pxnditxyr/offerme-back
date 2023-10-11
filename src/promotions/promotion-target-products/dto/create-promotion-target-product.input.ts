import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePromotionTargetProductInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
