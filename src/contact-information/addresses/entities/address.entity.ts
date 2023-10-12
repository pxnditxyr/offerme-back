import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Company } from 'src/companies/companies/entities/company.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class Address {
  @Field( () => ID )
  id: string

  @Field( () => String, { nullable: true } )
  street?: string | null

  @Field( () => String )
  city: string

  @Field( () => String )
  state: string

  @Field( () => String )
  country: string

  @Field( () => String, { nullable: true } )
  zipCode: string | null

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

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null

  @Field( () => [ User ], { nullable: true } )
  users?: User[]

  @Field( () => [ Company ], { nullable: true } )
  companies?: Company[]
}
