import { ObjectType, Field, ID } from '@nestjs/graphql'
import { PeopleInfo } from '../../../users/people-info/entities/people-info.entity'
import { User } from '../../../users/users/entities/user.entity'
import { Parameter } from '../../parameters/entities/parameter.entity'

@ObjectType()
export class Subparameter {
  @Field( () => ID )
  id: string

  @Field( () => String )
  name: string

  @Field( () => String )
  description: string

  @Field( () => ID )
  parameterId: string

  @Field( () => Boolean )
  status: boolean

  @Field( () => Date )
  createdAt: Date

  @Field( () => ID, { nullable: true } )
  createdBy?: string | null
  
  @Field( () => Date )
  updatedAt: Date

  @Field( () => ID, { nullable: true } )
  updatedBy?: string | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null

  @Field( () => Parameter )
  parameter?: Parameter

  @Field( () => [ PeopleInfo ], { defaultValue: [] } )
  peopleInfoDocumentType?: PeopleInfo[]

  @Field( () => [ PeopleInfo ], { defaultValue: [] } )
  peopleInfoGender?: PeopleInfo[]
}
