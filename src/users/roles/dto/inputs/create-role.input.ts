import { InputType, Field, ID } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

@InputType()
export class CreateRoleInput {
  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  name: string

  // TODO: createdBy must be required
  @Field( () => ID, { nullable: true } )
  @IsOptional()
  @IsUUID()
  createdBy?: string
}
