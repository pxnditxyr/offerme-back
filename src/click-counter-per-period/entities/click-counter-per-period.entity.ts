import { ObjectType, Field, ID, Int } from '@nestjs/graphql'
import { Company } from 'src/companies/companies/entities/company.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class ClickCounterPerPeriod {
  @Field( () => ID )
  id: string

  @Field( () => ID )
  companyId: string

  @Field( () => Date )
  startDate: Date

  @Field( () => Date )
  endDate: Date

  @Field( () => Int )
  count: number

  @Field( () => Boolean )
  status: boolean

  @Field( () => Date )
  createdAt: Date

  @Field( () => ID, { nullable: true } )
  createdBy?: string | null

  @Field( () => Date )
  updatedAt: Date

  @Field( () => ID, { nullable: true } )
  updatedBy?: string | null

  @Field( () => Company, { nullable: true } )
  company?: Company | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null
}
