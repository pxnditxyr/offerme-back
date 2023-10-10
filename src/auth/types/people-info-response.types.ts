import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PeopleInfoResponse {
  @Field( () => ID )
  id: string

  @Field( () => String )
  name: string

  @Field( () => String )
  paternalSurname: string

  @Field( () => String )
  maternalSurname: string

  @Field( () => Date )
  birthdate: Date

  @Field( () => String )
  genderId: string
}
