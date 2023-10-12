import { InputType, Field, ID } from '@nestjs/graphql'
import { IsNumberString, IsUUID } from 'class-validator'

@InputType()
export class CreatePhoneInput {
  @Field( () => ID )
  @IsUUID()
  phoneTypeId: string

  @Field( () => String )
  @IsNumberString()
  number: string
}
