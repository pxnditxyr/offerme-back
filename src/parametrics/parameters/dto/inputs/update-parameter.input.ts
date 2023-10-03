import { InputType, Field, PartialType, ID } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'
import { CreateParameterInput } from './create-parameter.input'

@InputType()
export class UpdateParameterInput extends PartialType( CreateParameterInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string
}
