import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { CreatePromotionStatusInput } from './create-promotion-status.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdatePromotionStatusInput extends PartialType( CreatePromotionStatusInput ) {
  @Field( () => Int )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  adminApprovedStatus?: boolean

  @Field( () => Boolean )
  @IsOptional()
  @IsBoolean()
  adminRejectedStatus?: boolean

  @Field( () => String )
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  adminComment?: string

  @Field( () => String )
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  adminReason?: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
