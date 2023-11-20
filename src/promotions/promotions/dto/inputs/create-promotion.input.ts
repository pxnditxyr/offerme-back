import { InputType, Field, ID } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreatePromotionInput {
  @Field( () => ID )
  @IsUUID()
  companyId: string

  @Field( () => ID )
  @IsUUID()
  promotionPaymentId: string

  @Field( () => ID )
  @IsUUID()
  promotionRequestId: string

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

  @Field( () => String  )
  @IsNotEmpty()
  @IsString()
  comment: string

  @Field( () => Date )
  @IsDate()
  promotionStartAt: Date

  @Field( () => Date )
  @IsDate()
  promotionEndAt: Date
}
