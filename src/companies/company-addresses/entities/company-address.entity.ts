import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CompanyAddress {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
