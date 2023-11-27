import { CreateClickCounterPerPeriodInput } from './create-click-counter-per-period.input'
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateClickCounterPerPeriodInput extends PartialType( CreateClickCounterPerPeriodInput ) {
  @Field( () => ID )
  id: string

  @Field( () => Int )
  count: number
}
