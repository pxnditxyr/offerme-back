import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePromotionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
