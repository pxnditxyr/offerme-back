import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Subparameter } from 'src/parametrics/subparameters/entities/subparameter.entity'
import { PromotionPayment } from 'src/promotions/promotion-payments/entities/promotion-payment.entity'
import { UserCreditCard } from 'src/users/user-credit-cards/entities/user-credit-card.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class CreditCard {
  @Field( () => ID )
  id: string

  @Field( () => ID )
  creditCardTypeId: string

  @Field( () => String )
  number: string

  @Field( () => String )
  expMonth: string

  @Field( () => String )
  expYear: string

  @Field( () => String )
  cvv: string

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

  @Field( () => Subparameter, { nullable: true } )
  creditCardType?: Subparameter | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null

  @Field( () => [ UserCreditCard ], { nullable: true } )
  users?: UserCreditCard[]

  @Field( () => [ PromotionPayment ], { nullable: true } )
  promotionPayments?: PromotionPayment[]
}
