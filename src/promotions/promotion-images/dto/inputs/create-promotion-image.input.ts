import { InputType, Field, ID } from '@nestjs/graphql'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

@InputType()
export class CreatePromotionImageInput {
  @Field( () => ID )
  @IsUUID()
  promotionRequestId: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  url: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  alt: string
}
