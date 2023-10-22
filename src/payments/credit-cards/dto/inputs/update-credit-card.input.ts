import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreateCreditCardInput } from './create-credit-card.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateCreditCardInput extends PartialType( CreateCreditCardInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean )
  @IsOptional()
  @IsBoolean()
  status?: boolean
}
