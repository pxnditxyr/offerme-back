import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PeopleInfo {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
