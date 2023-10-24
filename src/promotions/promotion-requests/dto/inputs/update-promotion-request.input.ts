import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreatePromotionRequestInput } from './create-promotion-request.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdatePromotionRequestInput extends PartialType( CreatePromotionRequestInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
