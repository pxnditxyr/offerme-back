import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreateSubparameterInput } from './create-subparameter.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateSubparameterInput extends PartialType( CreateSubparameterInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
