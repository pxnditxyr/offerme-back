import { ObjectType, Field, ID, Float } from '@nestjs/graphql'
import { Company } from 'src/companies/companies/entities/company.entity'
import { Subparameter } from 'src/parametrics/subparameters/entities/subparameter.entity'
import { DiscountProduct } from 'src/promotions/discount-products/entities/discount-product.entity'
import { PromotionImage } from 'src/promotions/promotion-images/entities/promotion-image.entity'
import { PromotionPayment } from 'src/promotions/promotion-payments/entities/promotion-payment.entity'
import { PromotionStatus } from 'src/promotions/promotion-status/entities/promotion-status.entity'
import { PromotionTargetProduct } from 'src/promotions/promotion-target-products/entities/promotion-target-product.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class PromotionRequest {
  @Field( () => ID )
  id: string

  @Field( () => ID )
  requestingUserId: string

  @Field( () => ID )
  companyId: string

  @Field( () => String )
  title: string

  @Field( () => String )
  code: string

  @Field( () => String )
  description: string

  @Field( () => ID )
  promotionTypeId: string

  @Field( () => String )
  reason: string

  @Field( () => String )
  comment: string

  @Field( () => Date )
  promotionStartAt: Date

  @Field( () => Date )
  promotionEndAt: Date

  @Field( () => Float )
  inversionAmount: number

  @Field( () => ID )
  currencyId: string

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
  requestingUser?: User | null

  @Field( () => Company, { nullable: true } )
  company?: Company | null

  @Field( () => Subparameter, { nullable: true } )
  promotionType?: Subparameter | null

  @Field( () => Subparameter, { nullable: true } )
  currency?: Subparameter | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null

  @Field( () => [ PromotionImage ], { nullable: true } )
  images?: PromotionImage[]

  @Field( () => [ PromotionTargetProduct ], { nullable: true } )
  targetProducts?: PromotionTargetProduct[]

  @Field( () => [ PromotionStatus ], { nullable: true } )
  promotionStatus?: PromotionStatus[]

  @Field( () => [ PromotionPayment ], { nullable: true } )
  promotionPayments?: PromotionPayment[]

  @Field( () => [ DiscountProduct ], { nullable: true } )
  discountProducts?: DiscountProduct[]
}
