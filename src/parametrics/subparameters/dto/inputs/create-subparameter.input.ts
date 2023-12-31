import { InputType, Field, ID } from '@nestjs/graphql'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

@InputType()
export class CreateSubparameterInput {

  @Field( () => String, { description: 'The name of the subparameter' } )
  @IsNotEmpty()
  @IsString()
  name: string

  @Field( () => String, { description: 'The description of the subparameter' } )
  @IsNotEmpty()
  @IsString()
  description: string

  @Field( () => ID, { description: 'The parameter id of the subparameter' } )
  @IsUUID()
  parameterId: string
}
