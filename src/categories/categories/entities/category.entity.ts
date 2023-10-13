import { ObjectType, Field, ID, Int } from '@nestjs/graphql'
import { CategoryImage } from 'src/categories/category-images/entities/category-image.entity'
import { CompanyCategory } from 'src/companies/company-categories/entities/company-category.entity'
import { ProductCategory } from 'src/products/product-categories/entities/product-category.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class Category {
  @Field( () => ID )
  id: string

  @Field( () => String )
  name: string

  @Field( () => String )
  description: string

  @Field( () => Int )
  order: number

  @Field( () => ID, { nullable: true } )
  parentId?: string | null

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

  @Field( () => Category, { nullable: true } )
  parent?: Category | null

  @Field( () => [ Category ], { nullable: true } )
  children?: Category[]

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null

  @Field( () => [ CategoryImage ], { nullable: true } )
  images?: CategoryImage[]

  @Field( () => [ CompanyCategory ], { nullable: true } )
  companies?: CompanyCategory[]

  @Field( () => [ ProductCategory ], { nullable: true } )
  products?: ProductCategory[]
}
