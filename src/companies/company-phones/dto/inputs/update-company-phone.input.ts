import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreateCompanyPhoneInput } from './create-company-phone.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateCompanyPhoneInput extends PartialType( CreateCompanyPhoneInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
