import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePromotionStatusInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
