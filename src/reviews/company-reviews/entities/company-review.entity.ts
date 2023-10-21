import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Company } from 'src/companies/companies/entities/company.entity'
import { Review } from 'src/reviews/reviews/entities/review.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class CompanyReview {
  @Field( () => ID )
  id: string

  @Field( () => ID )
  reviewId: string

  @Field( () => ID )
  companyId: string

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

  @Field( () => Review, { nullable: true } )
  review?: Review | null

  @Field( () => Company, { nullable: true } )
  company?: Company | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null
}
