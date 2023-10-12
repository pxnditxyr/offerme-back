import { InputType, Field, PartialType, ID } from '@nestjs/graphql'
import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreateUserInput } from './create-user.input'

@InputType()
export class UpdateUserInput extends PartialType( CreateUserInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  isVerifiedEmail: boolean

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}

