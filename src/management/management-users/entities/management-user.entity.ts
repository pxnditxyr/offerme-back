import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Address } from 'src/contact-information/addresses/entities/address.entity'
import { Phone } from 'src/contact-information/phones/entities/phone.entity'
import { CreditCard } from 'src/payments/credit-cards/entities/credit-card.entity'
import { PeopleInfo } from 'src/users/people-info/entities/people-info.entity'
import { Role } from 'src/users/roles/entities/role.entity'
import { UserAvatar } from 'src/users/user-avatars/entities/user-avatar.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class ManagementUser {
  @Field( () => ID )
  id: string

  @Field( () => String )
  email: string

  @Field( () => PeopleInfo )
  peopleInfo: PeopleInfo

  @Field( () => Role )
  role: Role
  
  @Field( () => String, { nullable: true } )
  mainAvatar: string | null

  @Field( () => String, { nullable: true } )
  mainPhone: string | null

  @Field( () => Address, { nullable: true } )
  mainAddress: Address | null

  @Field( () => Boolean )
  isVerifiedEmail: boolean

  @Field( () => String, { nullable: true } )
  googleId: string | null

  @Field( () => Boolean )
  status: boolean

  @Field( () => Date )
  createdAt: Date

  @Field( () => Date )
  updatedAt: Date

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null

  @Field( () => [ UserAvatar ] )
  avatars: UserAvatar[]

  @Field( () => [ Phone ] )
  phones: Phone[]

  @Field( () => [ Address ] )
  addresses: Address[]

  @Field( () => [ CreditCard ] )
  creditCards: CreditCard[]
}
