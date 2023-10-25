import { InputType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateCodePromotionDiscountProductInput {
  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  code: string

  @Field( () => ID )
  @IsUUID()
  discountProductId: string 
}
