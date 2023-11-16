import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateManagementProductInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
