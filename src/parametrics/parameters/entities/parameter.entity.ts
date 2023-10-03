import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Subparameter } from '../../subparameters/entities/subparameter.entity'
import { User } from '../../../users/users/entities/user.entity'

@ObjectType()
export class Parameter {
  @Field( () => ID )
  id: string

  @Field( () => String )
  name: string

  @Field( () => String )
  description: string

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
  creator?: User

  @Field( () => User, { nullable: true } )
  updater?: User

  @Field( () => [ Subparameter ], { defaultValue: [] } )
  subparameters?: Subparameter[]
}
