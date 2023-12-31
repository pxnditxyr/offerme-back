import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreateRoleInput } from './create-role.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
