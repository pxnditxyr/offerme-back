import { InputType, Field, ID } from '@nestjs/graphql';
import { IsDateString, IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateCompanyInput {
  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  name: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  description: string

  @Field( () => ID )
  @IsUUID()
  companyTypeId: string

  @Field( () => ID, { nullable: true } )
  @IsOptional()
  @IsUUID()
  documentTypeId?: string | null

  @Field( () => String, { nullable: true } )
  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  documentNumber?: string | null

  @Field( () => String, { nullable: true } )
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  website?: string | null

  @Field( () => String, { nullable: true } )
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string | null

  @Field( () => Date, { nullable: true } )
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  foundedAt?: Date | null
}
