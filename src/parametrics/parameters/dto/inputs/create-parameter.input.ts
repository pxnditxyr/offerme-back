import { InputType, Field, ID } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

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

  @Field( () => ID, { nullable: true, description: 'Parameter creator' } )
  @IsOptional()
  @IsUUID()
  createdBy?: string
}
