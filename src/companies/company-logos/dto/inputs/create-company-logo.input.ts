import { InputType, Field, ID } from '@nestjs/graphql'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

@InputType()
export class CreateCompanyLogoInput {

  @Field( () => ID )
  @IsUUID()
  companyId: string
  
  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  url: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  alt: string
}
