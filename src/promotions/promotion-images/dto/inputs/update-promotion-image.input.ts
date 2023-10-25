import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreatePromotionImageInput } from './create-promotion-image.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdatePromotionImageInput extends PartialType( CreatePromotionImageInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
