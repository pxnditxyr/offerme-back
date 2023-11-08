import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreateManagementUserInput } from './create-management-user.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateManagementUserInput extends PartialType( CreateManagementUserInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
