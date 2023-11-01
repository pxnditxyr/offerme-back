import { IsBoolean, IsDate, IsOptional, IsUUID } from 'class-validator'
import { CreateCodePromotionDiscountProductInput } from './create-code-promotion-discount-product.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateCodePromotionDiscountProductInput extends PartialType(CreateCodePromotionDiscountProductInput) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean )
  @IsOptional()
  @IsBoolean()
  isUsed: boolean

  @Field( () => Date, { nullable: true } )
  @IsOptional()
  @IsDate()
  usedAt?: Date | null

  @Field( () => ID, { nullable: true } )
  @IsOptional()
  @IsUUID()
  usedBy?: string | null

  @Field( () => Boolean )
  @IsOptional()
  @IsBoolean()
  isRedeemed: boolean

  @Field( () => Date, { nullable: true } )
  @IsOptional()
  @IsDate()
  redeemedAt?: Date | null

  @Field( () => ID, { nullable: true } )
  @IsOptional()
  @IsUUID()
  redeemedBy?: string | null
}
