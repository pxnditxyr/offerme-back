import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType()
export class CreateAddressInput {
  @Field( () => String, { nullable: true } )
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  street?: string | null

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  city: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  state: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  country: string

  @Field( () => String, { nullable: true } )
  @IsOptional()
  @IsString()
  zipCode: string | null
}
