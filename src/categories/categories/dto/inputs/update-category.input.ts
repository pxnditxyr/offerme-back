import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreateCategoryInput } from './create-category.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateCategoryInput extends PartialType( CreateCategoryInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
