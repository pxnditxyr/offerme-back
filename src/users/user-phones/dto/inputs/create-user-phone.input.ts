import { InputType, Field, ID } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'

@InputType()
export class CreateUserPhoneInput {
  @Field( () => ID )
  @IsUUID()
  userId: string
  
  @Field( () => ID )
  @IsUUID()
  phoneId: string
}
