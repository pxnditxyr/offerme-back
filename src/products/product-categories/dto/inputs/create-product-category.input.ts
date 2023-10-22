import { InputType, Field, ID } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'

@InputType()
export class CreateProductCategoryInput {
  @Field( () => ID )
  @IsUUID()
  productId: string
  
  @Field( () => ID )
  @IsUUID()
  categoryId: string
}
