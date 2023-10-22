import { InputType, Field, PartialType, ID } from '@nestjs/graphql'
import { CreateProductCategoryInput } from './create-product-category.input'
import { IsBoolean, IsOptional, IsUUID } from 'class-validator'

@InputType()
export class UpdateProductCategoryInput extends PartialType( CreateProductCategoryInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
