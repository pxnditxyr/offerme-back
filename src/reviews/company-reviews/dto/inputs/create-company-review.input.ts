import { InputType, Field, ID, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator'

@InputType()
export class CreateCompanyReviewInput {
  @Field( () => ID )
  @IsUUID()
  companyId: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  review: string

  @Field( () => Int )
  @Min( 1 )
  @IsInt()
  rating: number
}
