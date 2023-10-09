import { InputType, Field, ID } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, IsUUID, Matches } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field( () => ID )
  @IsUUID()
  peopleInfoId: string

  @Field( () => ID )
  @IsUUID()
  roleId: string

  @Field( () => String )
  @IsEmail()
  email: string

  @Field( () => String )
  @IsString()
  @Matches( /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, { message: 'The password must contain at least one uppercase letter, one lowercase letter, one number and one special character' } )
  password: string

  @Field( () => String, { nullable: true } )
  @IsOptional()
  @IsString()
  googleId?: string | null

  @Field( () => ID, { nullable: true } )
  @IsOptional()
  @IsUUID()
  createdBy?: string | null
}
