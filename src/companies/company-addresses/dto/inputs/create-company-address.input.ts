import { InputType, Field, ID } from '@nestjs/graphql'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

@InputType()
export class CreateCompanyAddressInput {
  @Field( () => ID )
  @IsUUID()
  companyId: string

  @Field( () => ID )
  @IsUUID()
  addressId: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  name: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  description: string
}
