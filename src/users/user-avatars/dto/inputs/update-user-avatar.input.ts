import { InputType, Field, PartialType, ID } from '@nestjs/graphql'
import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreateUserAvatarInput } from './create-user-avatar.input'

@InputType()
export class UpdateUserAvatarInput extends PartialType( CreateUserAvatarInput ) {
  @Field( () => ID )
  @IsUUID()
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
