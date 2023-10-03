import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateParameterInput {
  @Field( () => String, { description: 'Parameter name' } )
  @IsNotEmpty()
  @IsString()
  name: string

  @Field( () => String, { description: 'Parameter description' } )
  @IsNotEmpty()
  @IsString()
  description: string
}
