import { IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { CreateCompanyReviewInput } from './create-company-review.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateCompanyReviewInput extends PartialType( CreateCompanyReviewInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  review: string
}
