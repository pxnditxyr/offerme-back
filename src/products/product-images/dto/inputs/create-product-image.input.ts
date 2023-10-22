import { InputType, Field, ID } from '@nestjs/graphql'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

@InputType()
export class CreateProductImageInput {
  @Field( () => ID )
  @IsUUID()
  productId: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  url: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  alt: string
}
