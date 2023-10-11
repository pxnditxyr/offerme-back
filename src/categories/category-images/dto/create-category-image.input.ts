import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryImageInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
