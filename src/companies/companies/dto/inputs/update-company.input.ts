import { IsBoolean, IsNumber, IsOptional, IsUUID } from 'class-validator'
import { CreateCompanyInput } from './create-company.input'
import { InputType, Field, PartialType, ID, Float } from '@nestjs/graphql'

@InputType()
export class UpdateCompanyInput extends PartialType( CreateCompanyInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Float, { nullable: true } )
  @IsOptional()
  @IsNumber()
  rank?: number

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
