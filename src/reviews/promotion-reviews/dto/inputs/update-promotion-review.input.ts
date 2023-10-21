import { InputType, Field, ID } from '@nestjs/graphql'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

@InputType()
export class UpdatePromotionReviewInput {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => ID )
  @IsNotEmpty()
  @IsString()
  review: string
}
