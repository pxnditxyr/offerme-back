import { Field, ID, ObjectType } from '@nestjs/graphql'
import { PeopleInfoResponse } from './people-info-response.types'
import { RoleResponse } from './role-response.types'

@ObjectType()
export class UserResponse {
  @Field( () => ID )
  id: string

  @Field( () => String )
  email: string

  @Field( () => PeopleInfoResponse )
  peopleInfo: PeopleInfoResponse

  @Field( () => RoleResponse )
  role: RoleResponse
}
