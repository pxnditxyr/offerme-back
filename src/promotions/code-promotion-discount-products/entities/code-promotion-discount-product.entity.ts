import { ObjectType, Field, ID } from '@nestjs/graphql';
import { DiscountProduct } from 'src/promotions/discount-products/entities/discount-product.entity';
import { User } from 'src/users/users/entities/user.entity';

@ObjectType()
export class CodePromotionDiscountProduct {
  @Field( () => ID )
  id: string

  @Field( () => String )
  code: string

  @Field( () => ID )
  discountProductId: string

  @Field( () => Boolean )
  used: boolean

  @Field( () => Date, { nullable: true } )
  usedAt?: Date | null

  @Field( () => ID, { nullable: true } )
  usedBy?: string | null

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

  @Field( () => DiscountProduct, { nullable: true } )
  discountProduct?: DiscountProduct | null

  @Field( () => User, { nullable: true } )
  user?: User | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null
}
