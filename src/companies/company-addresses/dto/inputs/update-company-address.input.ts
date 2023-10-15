import { IsBoolean, IsOptional } from 'class-validator'
import { CreateCompanyAddressInput } from './create-company-address.input'
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateCompanyAddressInput extends PartialType( CreateCompanyAddressInput ) {
  @Field( () => ID )
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
