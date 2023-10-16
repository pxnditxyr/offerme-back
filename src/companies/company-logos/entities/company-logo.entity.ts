import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import { Company } from 'src/companies/companies/entities/company.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class CompanyLogo {

  @Field( () => ID )
  id: string

  @Field( () => ID )
  companyId: string
  
  @Field( () => String )
  url: string

  @Field( () => String )
  alt: string

  @Field( () => Boolean )
  isMain: boolean

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
