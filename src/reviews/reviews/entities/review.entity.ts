import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import { Comment } from 'src/reviews/comments/entities/comment.entity'
import { CompanyReview } from 'src/reviews/company-reviews/entities/company-review.entity'
import { PromotionReview } from 'src/reviews/promotion-reviews/entities/promotion-review.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class Review {
  @Field( () => ID )
  id: string

  @Field( () => ID )
  userId: string

  @Field( () => String )
  review: string

  @Field( () => Int )
  rating: number

  @Field( () => Date )
  reviewDate: Date

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

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null

  @Field( () => Comment, { nullable: true } )
  comments?: Comment[]

  @Field( () => [ PromotionReview ], { nullable: true } )
  promotionReviews?: PromotionReview[]

  @Field( () => [ CompanyReview ], { nullable: true } )
  companyReviews?: CompanyReview[]

}
