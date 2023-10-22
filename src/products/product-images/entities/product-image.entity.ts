import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Product } from 'src/products/products/entities/product.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class ProductImage {
  @Field( () => ID )
  id: string

  @Field( () => ID )
  productId: string

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

  @Field( () => Product, { nullable: true } )
  product?: Product | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null
}
