import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

@InputType()
export class CreateDiscountProductInput {
  @Field( () => ID )
  @IsUUID()
  productId: string

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
  description: string

  @Field( () => Float )
  @IsNumber()
  @Min( 0 )
  discountPercentage: number

  @Field( () => Float )
  @IsNumber()
  @Min( 0 )
  discountAmount: number

  @Field( () => Float )
  @IsNumber()
  @Min( 0 )
  discountPrice: number
}
