import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCompanyCategoryInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
