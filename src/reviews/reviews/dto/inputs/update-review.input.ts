import { IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { InputType, Field, ID } from '@nestjs/graphql'

@InputType()
export class UpdateReviewInput {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => String, { nullable: true } )
  @IsNotEmpty()
  @IsString()
  review: string
}
