import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreateUserPhoneInput } from './create-user-phone.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateUserPhoneInput extends PartialType( CreateUserPhoneInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  isMain?: boolean

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
