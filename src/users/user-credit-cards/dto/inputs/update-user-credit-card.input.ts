import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreateUserCreditCardInput } from './create-user-credit-card.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateUserCreditCardInput extends PartialType( CreateUserCreditCardInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
