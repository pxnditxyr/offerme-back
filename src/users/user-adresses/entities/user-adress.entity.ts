import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserAdress {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
