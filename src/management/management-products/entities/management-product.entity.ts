import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ManagementProduct {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
