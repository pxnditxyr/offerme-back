import { ObjectType, Field, ID } from '@nestjs/graphql'
import { PromotionRequest } from 'src/promotions/promotion-requests/entities/promotion-request.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class PromotionStatus {
  @Field( () => ID )
  id: string

  @Field( () => ID )
  promotionRequestId: string

  @Field( () => Boolean )
  adminApprovedStatus: boolean

  @Field( () => Date, { nullable: true } )
  adminApprovedAt?: Date | null

  @Field( () => ID, { nullable: true } )
  adminApprovedBy?: string | null

  @Field( () => Boolean )
  adminRejectedStatus: boolean

  @Field( () => Date, { nullable: true } )
  adminRejectedAt?: Date | null

  @Field( () => ID, { nullable: true } )
  adminRejectedBy?: string | null

  @Field( () => String, { nullable: true } )
  adminComment?: string | null

  @Field( () => String, { nullable: true } )
  adminReason?: string | null

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

  @Field( () => User, { nullable: true } )
  adminApproved?: User | null

  @Field( () => User, { nullable: true } )
  adminRejected?: User | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null
}
