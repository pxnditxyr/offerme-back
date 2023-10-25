import { InputType, Field, ID } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'

@InputType()
export class CreatePromotionStatusInput {
  @Field( () => ID )
  @IsUUID()
  promotionRequestId: string
}
