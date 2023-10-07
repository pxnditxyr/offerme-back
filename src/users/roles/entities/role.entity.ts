import { ObjectType, Field, ID } from '@nestjs/graphql'
import { User } from '../../users/entities/user.entity'

@ObjectType()
export class Role {
  @Field( () => ID )
  id: string

  @Field( () => String )
  name: string

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

  @Field( () => [ User ], { nullable: true } )
  users?: User[] | null
}
