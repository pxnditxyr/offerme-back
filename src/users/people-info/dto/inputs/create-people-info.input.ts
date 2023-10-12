import { InputType, Field, ID } from '@nestjs/graphql'
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType()
export class CreatePeopleInfoInput {
  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  name: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  paternalSurname: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  maternalSurname: string

  @Field( () => ID, { nullable: true } )
  @IsOptional()
  @IsString()
  documentTypeId?: string

  @Field( () => String, { nullable: true } )
  @IsOptional()
  @IsString()
  documentNumber?: string

  @Field( () => Date )
  @IsDateString()
  birthdate: Date

  @Field( () => ID )
  @IsNotEmpty()
  @IsString()
  genderId: string
}
