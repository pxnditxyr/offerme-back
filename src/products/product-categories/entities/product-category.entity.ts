import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import { Category } from 'src/categories/categories/entities/category.entity'
import { Product } from 'src/products/products/entities/product.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class ProductCategory {
  @Field( () => ID )
  id: string

  @Field( () => ID )
  productId: string
  
  @Field( () => ID )
  categoryId: string

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

  @Field( () => Category, { nullable: true } )
  category?: Category | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null
}
