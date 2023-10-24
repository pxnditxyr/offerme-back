import { ObjectType, Field, ID, Float } from '@nestjs/graphql'
import { Subparameter } from 'src/parametrics/subparameters/entities/subparameter.entity'
import { CreditCard } from 'src/payments/credit-cards/entities/credit-card.entity'
import { PromotionRequest } from 'src/promotions/promotion-requests/entities/promotion-request.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class PromotionPayment {
  @Field( () => ID )
  id: string

  @Field( () => ID )
  promotionRequestId: string

  @Field( () => ID )
  paymentMethodId: string

  @Field( () => Float )
  amount: number

  @Field( () => ID, { nullable: true } )
  creditCardId?: string | null

  @Field( () => String, { nullable: true } )
  voucher?: string | null

  @Field( () => Date )
  paymentDate: Date

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

  @Field( () => PromotionRequest, { nullable: true } )
  promotionRequest?: PromotionRequest | null

  @Field( () => Subparameter, { nullable: true } )
  paymentMethod?: Subparameter | null

  @Field( () => CreditCard, { nullable: true } )
  creditCard?: CreditCard | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null
}
