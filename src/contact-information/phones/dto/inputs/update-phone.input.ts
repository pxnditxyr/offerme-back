import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreatePhoneInput } from './create-phone.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdatePhoneInput extends PartialType( CreatePhoneInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
