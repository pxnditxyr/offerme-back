import { InputType, Field, ID, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator'

@InputType()
export class CreatePromotionReviewInput {
  @Field( () => ID )
  @IsUUID()
  promotionId: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  review: string

  @Field( () => Int )
  @Min( 1 )
  @IsInt()
  rating: number
}
