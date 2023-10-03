import { InputType, Field, PartialType, ID } from '@nestjs/graphql'
import { IsOptional, IsUUID } from 'class-validator'
import { CreateParameterInput } from './create-parameter.input'

@InputType()
export class UpdateParameterInput extends PartialType( CreateParameterInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  //TODO; updatedBy should be required
  @Field( () => ID, { nullable: true, description: 'Parameter updater' } )
  @IsOptional()
  @IsUUID()
  updatedBy?: string
}
