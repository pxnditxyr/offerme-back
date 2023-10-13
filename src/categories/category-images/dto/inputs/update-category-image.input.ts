import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreateCategoryImageInput } from './create-category-image.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateCategoryImageInput extends PartialType( CreateCategoryImageInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  isMain: boolean

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
