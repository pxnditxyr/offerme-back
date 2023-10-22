import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreateProductImageInput } from './create-product-image.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateProductImageInput extends PartialType( CreateProductImageInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
