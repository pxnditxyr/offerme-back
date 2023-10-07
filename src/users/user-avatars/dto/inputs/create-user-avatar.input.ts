import { InputType, Field, ID } from '@nestjs/graphql'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

@InputType()
export class CreateUserAvatarInput {
  @Field( () => ID )
  @IsUUID()
  userId: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  url: string
}
