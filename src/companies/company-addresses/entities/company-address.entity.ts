import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Company } from 'src/companies/companies/entities/company.entity'
import { Address } from 'src/contact-information/addresses/entities/address.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class CompanyAddress {
  @Field( () => ID )
  id: string

  @Field( () => ID )
  companyId: string

  @Field( () => ID )
  addressId: string

  @Field( () => String )
  name: string

  @Field( () => String )
  description: string

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

  @Field( () => Address, { nullable: true } )
  address?: Address | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null
}
