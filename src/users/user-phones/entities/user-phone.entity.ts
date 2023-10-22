import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import { Phone } from 'src/contact-information/phones/entities/phone.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class UserPhone {
  @Field( () => ID )
  id: string

  @Field( () => ID )
  userId: string
  
  @Field( () => ID )
  phoneId: string

  @Field( () => Boolean )
  isVerified: boolean

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

  @Field( () => User, { nullable: true } )
  user?: User | null

  @Field( () => Phone, { nullable: true } )
  phone?: Phone | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null
}
