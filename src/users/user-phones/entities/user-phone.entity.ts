import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserPhone {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
