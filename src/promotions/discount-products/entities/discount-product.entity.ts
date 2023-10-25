import { ObjectType, Field, ID, Float } from '@nestjs/graphql'
import { Product } from 'src/products/products/entities/product.entity'
import { CodePromotionDiscountProduct } from 'src/promotions/code-promotion-discount-products/entities/code-promotion-discount-product.entity'
import { PromotionRequest } from 'src/promotions/promotion-requests/entities/promotion-request.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class DiscountProduct {
  @Field( () => ID )
  id: string

  @Field( () => ID )
  productId: string

  @Field( () => ID )
  userId: string

  @Field( () => ID )
  promotionRequestId: string

  @Field( () => String )
  title: string

  @Field( () => String )
  description: string

  @Field( () => Float )
  discountPercentage: number

  @Field( () => Float )
  discountAmount: number

  @Field( () => Float )
  discountPrice: number

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
  user?: User | null

  @Field( () => PromotionRequest, { nullable: true } )
  promotionRequest?: PromotionRequest | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null

  @Field( () => [ CodePromotionDiscountProduct ], { nullable: true } )
  codePromotion?: CodePromotionDiscountProduct[]
}
