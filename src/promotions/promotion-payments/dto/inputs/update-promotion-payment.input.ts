import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreatePromotionPaymentInput } from './create-promotion-payment.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdatePromotionPaymentInput extends PartialType( CreatePromotionPaymentInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
