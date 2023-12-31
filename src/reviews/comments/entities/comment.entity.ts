import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Review } from 'src/reviews/reviews/entities/review.entity';
import { User } from 'src/users/users/entities/user.entity';

@ObjectType()
export class Comment {

  @Field( () => ID )
  id: string

  @Field( () => ID )
  userId: string

  @Field( () => ID )
  reviewId: string

  @Field( () => String )
  comment: string

  @Field( () => Date )
  commentDate: Date

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

  @Field( () => Review, { nullable: true } )
  review?: Review | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null
}
