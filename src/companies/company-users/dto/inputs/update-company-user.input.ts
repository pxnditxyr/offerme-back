import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreateCompanyUserInput } from './create-company-user.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateCompanyUserInput extends PartialType( CreateCompanyUserInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
