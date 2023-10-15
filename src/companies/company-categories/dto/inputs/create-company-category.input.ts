import { InputType, Field, ID } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'

@InputType()
export class CreateCompanyCategoryInput {
  @Field( () => ID )
  @IsUUID()
  companyId: string

  @Field( () => ID )
  @IsUUID()
  categoryId: string
}
