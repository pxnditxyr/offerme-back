import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Company } from 'src/companies/companies/entities/company.entity'
import { Phone } from 'src/contact-information/phones/entities/phone.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class CompanyPhone {
  @Field( () => ID )
  id: string

  @Field( () => ID )
  companyId: string

  @Field( () => ID )
  phoneId: string

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

  @Field( () => Phone, { nullable: true } )
  phone?: Phone | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null
}
