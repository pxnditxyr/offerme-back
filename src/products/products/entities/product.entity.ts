import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql'
import { Company } from 'src/companies/companies/entities/company.entity'
import { Subparameter } from 'src/parametrics/subparameters/entities/subparameter.entity'
import { ProductCategory } from 'src/products/product-categories/entities/product-category.entity'
import { ProductImage } from 'src/products/product-images/entities/product-image.entity'
import { DiscountProduct } from 'src/promotions/discount-products/entities/discount-product.entity'
import { PromotionTargetProduct } from 'src/promotions/promotion-target-products/entities/promotion-target-product.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class Product {
  @Field( () => ID )
  id: string

  @Field( () => String )
  name: string

  @Field( () => String )
  description: string

  @Field( () => ID )
  companyId: string

  @Field( () => ID )
  productTypeId: string

  @Field( () => Int )
  stock: number

  @Field( () => Float )
  price: number

  // TODO: CODE Must be unique in the company scope
  @Field( () => String )
  code: string

  @Field( () => String )
  notes: string

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

  @Field( () => Subparameter, { nullable: true } )
  productType?: Subparameter | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null

  @Field( () => [ ProductImage ], { nullable: true } )
  images?: ProductImage[]

  @Field( () => [ ProductCategory ], { nullable: true } )
  categories?: ProductCategory[]

  @Field( () => [ PromotionTargetProduct ], { nullable: true } )
  promotionRequests?: PromotionTargetProduct[]

  @Field( () => [ DiscountProduct ], { nullable: true } )
  discountProducts?: DiscountProduct[]
}
