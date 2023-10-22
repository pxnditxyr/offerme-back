import { InputType, Field, ID } from '@nestjs/graphql'
import { IsNumberString, IsUUID } from 'class-validator'

@InputType()
export class CreateCreditCardInput {
  @Field( () => ID )
  @IsUUID()
  creditCardTypeId: string

  @Field( () => String )
  @IsNumberString()
  number: string

  @Field( () => String )
  @IsNumberString()
  expMonth: string

  @Field( () => String )
  @IsNumberString()
  expYear: string

  @Field( () => String )
  @IsNumberString()
  cvv: string
}
