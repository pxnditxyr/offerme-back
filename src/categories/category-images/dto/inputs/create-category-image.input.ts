import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateCategoryImageInput {
  @Field( () => ID )
  @IsUUID()
  categoryId: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  url: string

  @Field( () => String, { description: 'Image description text' } )
  @IsNotEmpty()
  @IsString()
  alt: string
}
