import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Matches } from 'class-validator'

export class SignupDto {
  @IsDateString()
  birthdate: Date

  @IsNotEmpty()
  @IsString()
  maternalSurname: string

  @IsNotEmpty()
  @IsString()
  paternalSurname: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsUUID()
  genderId: string

  @IsEmail()
  email: string
  
  @IsString()
  @Matches( /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, { message: 'The password must contain at least one uppercase letter, one lowercase letter, one number and one special character' } )
  password: string

  @IsOptional()
  @IsString()
  googleId?: string

  @IsNotEmpty()
  @IsString()
  ipAddress: string

  @IsNotEmpty()
  @IsString()
  userAgent: string
}
