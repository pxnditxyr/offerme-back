import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class Parameters {
  @Field( () => Int, { description: 'Example field (placeholder)' } )
  exampleField: number
}
