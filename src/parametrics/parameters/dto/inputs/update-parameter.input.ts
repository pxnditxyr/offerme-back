import { InputType, Field, PartialType, ID } from '@nestjs/graphql'
import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreateParameterInput } from './create-parameter.input'

@InputType()
export class UpdateParameterInput extends PartialType( CreateParameterInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean

  //TODO; updatedBy should be required
  @Field( () => ID, { nullable: true, description: 'Parameter updater' } )
  @IsOptional()
  @IsUUID()
  updatedBy?: string
}
