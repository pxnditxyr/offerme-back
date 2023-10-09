import { Field, ID, ObjectType } from '@nestjs/graphql'
import { UserResponse } from './user-response.types'

@ObjectType()
export class AuthResponse {
  @Field( () => ID )
  token: string

  @Field( () => UserResponse )
  user: UserResponse
}
