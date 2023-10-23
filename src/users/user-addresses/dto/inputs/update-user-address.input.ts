import { IsBoolean, IsOptional } from 'class-validator'
import { CreateUserAddressInput } from './create-user-address.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateUserAddressInput extends PartialType( CreateUserAddressInput ) {
  @Field( () => ID )
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  isMain?: boolean

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
