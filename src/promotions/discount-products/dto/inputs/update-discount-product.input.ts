import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreateDiscountProductInput } from './create-discount-product.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateDiscountProductInput extends PartialType( CreateDiscountProductInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
