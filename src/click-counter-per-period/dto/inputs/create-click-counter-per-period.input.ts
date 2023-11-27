import { InputType, Field, ID } from '@nestjs/graphql'

@InputType()
export class CreateClickCounterPerPeriodInput {
  @Field( () => ID )
  companyId: string

  @Field( () => Date )
  startDate: Date

  @Field( () => Date )
  endDate: Date
}
