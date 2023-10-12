import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreateAddressInput } from './create-address.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateAddressInput extends PartialType( CreateAddressInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status: boolean
}
