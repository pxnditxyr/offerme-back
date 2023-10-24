import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreateCompanyInput } from './create-company.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateCompanyInput extends PartialType( CreateCompanyInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
