import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CompanyUser {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
