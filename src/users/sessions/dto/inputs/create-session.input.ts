import { InputType, Field, ID } from '@nestjs/graphql'
import { IsString, IsUUID } from 'class-validator'

@InputType()
export class CreateSessionInput {
  @Field( () => ID )
  @IsUUID()
  userId: string

  @Field( () => String )
  @IsString()
  token: string

  @Field( () => String )
  @IsString()
  ipAddress: string

  @Field( () => String )
  @IsString()
  userAgent: string
}
