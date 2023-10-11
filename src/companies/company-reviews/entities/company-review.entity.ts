import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CompanyReview {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
