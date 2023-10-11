import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePromotionImageInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
