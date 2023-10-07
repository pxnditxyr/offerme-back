import { InputType, Field, ID } from '@nestjs/graphql';
import { IsEmail, IsString, IsUUID, Matches } from 'class-validator';

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
  @Matches( /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, { message: 'password too weak' } )
  password: string

  @Field( () => String, { nullable: true } )
  googleId: string | null

  @Field( () => ID, { nullable: true } )
  createdBy?: string | null
}
