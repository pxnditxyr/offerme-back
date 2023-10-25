import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreatePromotionTargetProductInput } from './create-promotion-target-product.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdatePromotionTargetProductInput extends PartialType( CreatePromotionTargetProductInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
