import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Subparameter } from '../../../parametrics/subparameters/entities/subparameter.entity'
import { User } from '../../../users/users/entities/user.entity'

@ObjectType()
export class PeopleInfo {
  @Field( () => ID )
  id: string

  @Field( () => String )
  name: string

  @Field( () => String )
  parternalSurname: string

  @Field( () => String )
  maternalSurname: string

  @Field( () => ID, { nullable: true } )
  documentTypeId?: string | null

  @Field( () => String, { nullable: true } )
  documentNumber?: string | null

  @Field( () => Date )
  birthdate: Date

  @Field( () => ID )
  genderId: string

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

  @Field( () => Subparameter, { nullable: true } )
  documentType?: Subparameter | null

  @Field( () => Subparameter )
  gender?: Subparameter

  @Field( () => [ User ], { defaultValue: [] } )
  users?: User[]
}
