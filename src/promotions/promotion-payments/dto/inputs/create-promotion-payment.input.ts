import { InputType, Field, ID, Float } from '@nestjs/graphql'
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator'

@InputType()
export class CreatePromotionPaymentInput {
  @Field( () => ID )
  @IsUUID()
  promotionRequestId: string

  @Field( () => ID )
  @IsUUID()
  paymentMethodId: string

  @Field( () => Float, { nullable: true } )
  @IsOptional()
  @Min( 0 )
  @IsNumber()
  amount: number

  @Field( () => ID, { nullable: true } )
  @IsOptional()
  @IsUUID()
  creditCardId?: string

  @Field( () => String, { nullable: true } )
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  voucher?: string

  @Field( () => Date, { nullable: true } )
  @IsOptional()
  @IsDate()
  paymentDate: Date
}
