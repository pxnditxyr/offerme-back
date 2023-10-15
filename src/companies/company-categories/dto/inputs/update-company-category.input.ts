import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreateCompanyCategoryInput } from './create-company-category.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateCompanyCategoryInput extends PartialType( CreateCompanyCategoryInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
