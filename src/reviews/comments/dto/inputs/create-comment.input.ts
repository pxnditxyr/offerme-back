import { InputType, Field, ID } from '@nestjs/graphql'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

@InputType()
export class CreateCommentInput {
  @Field( () => ID )
  @IsUUID()
  reviewId: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  comment: string
}
