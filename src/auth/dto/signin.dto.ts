import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SigninDto {
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  ipAddress: string

  @IsNotEmpty()
  @IsString()
  userAgent: string
}
