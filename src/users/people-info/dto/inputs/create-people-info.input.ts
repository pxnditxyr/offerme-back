import { InputType, Field, ID } from '@nestjs/graphql'
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

@InputType()
export class CreatePeopleInfoInput {
  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  name: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  parternalSurname: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  maternalSurname: string

  @Field( () => ID, { nullable: true } )
  @IsString()
  @IsOptional()
  documentTypeId?: string

  @Field( () => String, { nullable: true } )
  @IsString()
  @IsOptional()
  documentNumber?: string

  @Field( () => Date )
  @IsDateString()
  birthdate: Date

  @Field( () => ID )
  @IsNotEmpty()
  @IsString()
  genderId: string
  
  @Field( () => ID )
  @IsOptional()
  @IsUUID()
  createdBy?: string
}
