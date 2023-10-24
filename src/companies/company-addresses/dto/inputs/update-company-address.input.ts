import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreateCompanyAddressInput } from './create-company-address.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateCompanyAddressInput extends PartialType( CreateCompanyAddressInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
