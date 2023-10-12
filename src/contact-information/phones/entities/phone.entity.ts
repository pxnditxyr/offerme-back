import { ObjectType, Field, ID } from '@nestjs/graphql'
import { CompanyPhone } from 'src/companies/company-phones/entities/company-phone.entity'
import { Subparameter } from 'src/parametrics/subparameters/entities/subparameter.entity'
import { UserPhone } from 'src/users/user-phones/entities/user-phone.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class Phone {
  @Field( () => ID )
  id: string
  
  @Field( () => ID )
  phoneTypeId: string

  @Field( () => String )
  number: string

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

  @Field( () => Subparameter, { nullable: true } )
  phoneType?: Subparameter | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null

  @Field( () => [ UserPhone ], { nullable: true } )
  users?: UserPhone[]

  @Field( () => [ CompanyPhone ], { nullable: true } )
  companies?: CompanyPhone[]
}
