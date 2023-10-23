import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Address } from 'src/contact-information/addresses/entities/address.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class UserAddress {
  @Field( () => ID )
  id: string

  @Field( () => ID )
  userId: string

  @Field( () => ID )
  addressId: string

  @Field( () => Boolean )
  isMain: boolean

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
  user?: User | null

  @Field( () => Address, { nullable: true } )
  address?: Address | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null
}
