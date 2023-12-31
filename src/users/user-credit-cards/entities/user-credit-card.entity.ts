import { ObjectType, Field, ID } from '@nestjs/graphql'
import { CreditCard } from 'src/payments/credit-cards/entities/credit-card.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class UserCreditCard {
  @Field( () => ID )
  id: string

  @Field( () => ID )
  userId: string

  @Field( () => ID )
  creditCardId: string

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

  @Field( () => CreditCard, { nullable: true } )
  creditCard?: CreditCard | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null
}
