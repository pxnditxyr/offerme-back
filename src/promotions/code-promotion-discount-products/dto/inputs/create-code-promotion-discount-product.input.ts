import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

@InputType()
export class CreateCodePromotionDiscountProductInput {
  @Field( () => Int )
  @IsNotEmpty()
  @IsNumber()
  quantity: number

  @Field( () => ID )
  @IsUUID()
  discountProductId: string 
}
