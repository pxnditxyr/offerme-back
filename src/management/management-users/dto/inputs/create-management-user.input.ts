import { InputType, Field, ID } from '@nestjs/graphql'
import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Matches } from 'class-validator'

@InputType()
export class CreateManagementUserInput {
  @Field( () => String )
  @IsEmail()
  email: string

  @Field( () => String )
  @IsString()
  @Matches( /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, { message: 'The password must contain at least one uppercase letter, one lowercase letter, one number and one special character' } )
  password: string

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
  @IsUUID()
  documentTypeId: string | null
  
  @Field( () => String, { nullable: true } )
  @IsOptional()
  @IsString()
  documentNumber: string | null

  @Field( () => Date )
  @IsDate()
  birthdate: Date

  @Field( () => ID )
  @IsUUID()
  genderId: string

  @Field( () => ID )
  @IsUUID()
  roleId: string
}
