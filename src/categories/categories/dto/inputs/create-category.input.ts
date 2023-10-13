import { InputType, Field, Int, ID } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator'

@InputType()
export class CreateCategoryInput {

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  name: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  description: string

  @Field( () => Int )
  @Min( 0 )
  @IsNumber()
  order: number

  @Field( () => ID, { nullable: true } )
  @IsOptional()
  @IsUUID()
  parentId?: string | null
}
