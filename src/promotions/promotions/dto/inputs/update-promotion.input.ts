import { IsUUID } from 'class-validator'
import { CreatePromotionInput } from './create-promotion.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdatePromotionInput extends PartialType( CreatePromotionInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string
}
