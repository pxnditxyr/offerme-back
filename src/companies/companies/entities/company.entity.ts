import { ObjectType, Field, ID } from '@nestjs/graphql'
import { CompanyAddress } from 'src/companies/company-addresses/entities/company-address.entity'
import { CompanyCategory } from 'src/companies/company-categories/entities/company-category.entity'
import { CompanyLogo } from 'src/companies/company-logos/entities/company-logo.entity'
import { CompanyPhone } from 'src/companies/company-phones/entities/company-phone.entity'
import { Subparameter } from 'src/parametrics/subparameters/entities/subparameter.entity'
import { Product } from 'src/products/products/entities/product.entity'
import { PromotionRequest } from 'src/promotions/promotion-requests/entities/promotion-request.entity'
import { Promotion } from 'src/promotions/promotions/entities/promotion.entity'
import { CompanyReview } from 'src/reviews/company-reviews/entities/company-review.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class Company {
  @Field( () => ID )
  id: string

  @Field( () => String )
  name: string

  @Field( () => String )
  description: string

  @Field( () => ID )
  companyTypeId: string

  @Field( () => ID, { nullable: true } )
  documentTypeId?: string | null

  @Field( () => String, { nullable: true } )
  documentNumber?: string | null

  @Field( () => String, { nullable: true } )
  website?: string | null

  @Field( () => String, { nullable: true } )
  email?: string | null

  @Field( () => Date, { nullable: true } )
  foundedAt?: Date | null

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
  companyType?: Subparameter | null

  @Field( () => Subparameter, { nullable: true } )
  documentType?: Subparameter | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null

  @Field( () => [ CompanyLogo ], { nullable: true } )
  logos?: CompanyLogo[]

  @Field( () => [ CompanyPhone ], { nullable: true } )
  phones?: CompanyPhone[]

  @Field( () => [ CompanyAddress ], { nullable: true } )
  addresses?: CompanyAddress[]

  @Field( () => [ Product ], { nullable: true } )
  products?: Product[]

  @Field( () => [ CompanyCategory ], { nullable: true } )
  categories?: CompanyCategory[]

  @Field( () => [ User ], { nullable: true } )
  users?: User[]

  @Field( () => [ PromotionRequest ], { nullable: true } )
  promotionRequests?: PromotionRequest[]

  @Field( () => [ Promotion ], { nullable: true } )
  promotions?: Promotion[]

  @Field( () => [ CompanyReview ], { nullable: true } )
  companies?: CompanyReview[]
}
