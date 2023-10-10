import { IsOptional, IsUUID } from 'class-validator'
import { CreateSubparameterInput } from './create-subparameter.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateSubparameterInput extends PartialType( CreateSubparameterInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  //TODO: updatedBy should be required
  @Field( () => ID, { nullable: true, description: 'Subparameter updater' } )
  @IsOptional()
  @IsUUID()
  updatedBy?: string
}