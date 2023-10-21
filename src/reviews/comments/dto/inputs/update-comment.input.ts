import { InputType, Field, ID } from '@nestjs/graphql'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

@InputType()
export class UpdateCommentInput {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  comment: string
}
