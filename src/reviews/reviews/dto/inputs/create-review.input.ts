import { InputType, Int, Field } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator'

@InputType()
export class CreateReviewInput {
  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  review: string

  @Field( () => Int )
  @Min( 1 )
  @IsInt()
  rating: number
}
