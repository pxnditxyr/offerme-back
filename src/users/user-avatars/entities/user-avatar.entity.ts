import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserAvatar {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
