import { InputType, Int, Field, ID, Float } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator'

@InputType()
export class CreateProductInput {
  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  name: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  description: string

  @Field( () => ID )
  @IsUUID()
  companyId: string

  @Field( () => ID )
  @IsUUID()
  productTypeId: string

  @Field( () => Int )
  @Min( 0 )
  @IsInt()
  stock: number

  @Field( () => Float )
  @Min( 0 )
  @IsNumber()
  price: number

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  code: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  notes: string
}
