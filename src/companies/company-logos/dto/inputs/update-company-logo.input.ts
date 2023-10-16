import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreateCompanyLogoInput } from './create-company-logo.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateCompanyLogoInput extends PartialType(CreateCompanyLogoInput) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  isMain?: boolean

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
