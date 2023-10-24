import { InputType, Field, ID, Float } from '@nestjs/graphql'
import { IsDate, IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator'

@InputType()
export class CreatePromotionRequestInput {
  @Field( () => ID )
  @IsUUID()
  companyId: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  title: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  code: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  description: string

  @Field( () => ID )
  @IsUUID()
  promotionTypeId: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  reason: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  comment: string

  @Field( () => Date )
  @IsDate()
  promotionStartAt: Date

  @Field( () => Date )
  @IsDate()
  promotionEndAt: Date

  @Field( () => Float )
  @IsNumber()
  @Min( 0 )
  inversionAmount: number

  @Field( () => ID )
  @IsUUID()
  currencyId: string
}
