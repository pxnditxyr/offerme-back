import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserAvatarInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
