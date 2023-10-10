import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RoleResponse {
  @Field( () => ID )
  id: string

  @Field( () => String )
  name: string
}
