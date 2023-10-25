import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Company } from 'src/companies/companies/entities/company.entity'
import { Subparameter } from 'src/parametrics/subparameters/entities/subparameter.entity'
import { PromotionPayment } from 'src/promotions/promotion-payments/entities/promotion-payment.entity'
import { PromotionRequest } from 'src/promotions/promotion-requests/entities/promotion-request.entity'
import { PromotionReview } from 'src/reviews/promotion-reviews/entities/promotion-review.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class Promotion {
  @Field( () => ID )
  id: string

  @Field( () => ID )
  userId: string

  @Field( () => ID )
  companyId: string

  @Field( () => ID )
  promotionPaymentId: string

  @Field( () => ID )
  promotionRequestId: string

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

  @Field( () => String  )
  comment: string

  @Field( () => Date )
  promotionStartAt: Date

  @Field( () => Date )
  promotionEndAt: Date

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

  @Field( () => Company, { nullable: true } )
  company?: Company | null

  @Field( () => Subparameter, { nullable: true } )
  promotionType?: Subparameter | null

  @Field( () => PromotionRequest, { nullable: true } )
  promotionRequest?: PromotionRequest | null

  @Field( () => PromotionPayment, { nullable: true } )
  promotionPayment?: PromotionPayment | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null

  @Field( () => [ PromotionReview ], { nullable: true } )
  promotionReviews?: PromotionReview[]
}
