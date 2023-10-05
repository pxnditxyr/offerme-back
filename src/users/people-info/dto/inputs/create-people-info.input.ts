import { InputType, Field, ID } from '@nestjs/graphql'
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

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
  @IsOptional()
  @IsString()
  documentTypeId?: string

  @Field( () => String, { nullable: true } )
  @IsOptional()
  @IsString()
  documentNumber?: string

  @Field( () => Date )
  @IsDate( { message: 'Birthdate must be a date' } )
  birthdate: Date

  @Field( () => ID )
  @IsNotEmpty()
  @IsString()
  genderId: string
  
  @Field( () => ID, { nullable: true } )
  @IsOptional()
  @IsUUID()
  createdBy?: string
}
