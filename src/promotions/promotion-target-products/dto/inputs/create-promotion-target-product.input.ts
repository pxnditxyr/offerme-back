import { InputType, Field, ID } from '@nestjs/graphql'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

@InputType()
export class CreatePromotionTargetProductInput {
  @Field( () => ID ) 
  @IsUUID()
  promotionRequestId: string

  @Field( () => ID )
  @IsUUID()
  productId: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  description: string
}
