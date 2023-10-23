import { InputType, Field, ID } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'

@InputType()
export class CreateUserCreditCardInput {
  @Field( () => ID )
  @IsUUID()
  userId: string

  @Field( () => ID )
  @IsUUID()
  creditCardId: string
}
