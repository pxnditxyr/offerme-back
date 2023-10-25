import { ObjectType, Field, ID } from '@nestjs/graphql'
import { PromotionRequest } from 'src/promotions/promotion-requests/entities/promotion-request.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class PromotionImage {
  @Field( () => ID )
  id: string

  @Field( () => ID )
  promotionRequestId: string

  @Field( () => String )
  url: string

  @Field( () => String )
  alt: string

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
  promotionRequest?: PromotionRequest  | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null
}
