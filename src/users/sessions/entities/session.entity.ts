import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class Session {
  @Field( () => ID )
  id: string

  @Field( () => ID )
  userId: string

  @Field( () => String )
  token: string

  @Field( () => String )
  ipAddress: string

  @Field( () => String )
  userAgent: string

  @Field( () => Date )
  startedAt: Date

  @Field( () => Date, { nullable: true } )
  endedAt?: Date | null

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

  @Field( () => User, { nullable: true } )
  user?: User | null
}
