import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'

import { ParametersModule, SubparametersModule } from './parametrics'

import {
  RolesModule, PeopleInfoModule, UsersModule, SessionsModule,
  UserAvatarsModule, UserPhonesModule, UserAddressesModule, UserCreditCardsModule,
} from './users'

import { AuthModule } from './auth'
import { PhonesModule, AddressesModule } from './contact-information'

import {
  CompaniesModule, CompanyUsersModule, CompanyCategoriesModule, CompanyAddressesModule,
  CompanyPhonesModule, CompanyLogosModule,
} from './companies'

import {
  CodePromotionDiscountProductsModule, PromotionsModule, PromotionStatusModule,
  PromotionPaymentsModule, DiscountProductsModule, PromotionTargetProductsModule,
  PromotionImagesModule, PromotionRequestsModule,
} from './promotions'

import { CreditCardsModule } from './payments'
import { CategoriesModule, CategoryImagesModule  } from './categories'
import { ProductsModule, ProductImagesModule, ProductCategoriesModule } from './products'
import { ReviewsModule, CommentsModule, PromotionReviewsModule, CompanyReviewsModule  } from './reviews'
import { SeedModule } from './seed'
import { CommonModule } from './common'

import { ManagementUsersModule, ManagementProductsModule } from './management'

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault(),
      ]
    }),
    ParametersModule, SubparametersModule,
    PeopleInfoModule, UsersModule, RolesModule, SessionsModule,
    UserAvatarsModule, UserPhonesModule, UserAddressesModule, AuthModule,
    PhonesModule, AddressesModule,
    CompaniesModule, CompanyLogosModule, CompanyPhonesModule, CompanyAddressesModule, CompanyCategoriesModule, CompanyUsersModule, 
    CategoriesModule, CategoryImagesModule,
    ProductsModule, ProductImagesModule, ProductCategoriesModule,
    CreditCardsModule, UserCreditCardsModule,
    PromotionRequestsModule, PromotionImagesModule, PromotionTargetProductsModule,
    DiscountProductsModule, PromotionStatusModule, PromotionPaymentsModule,
    PromotionsModule, CodePromotionDiscountProductsModule, ReviewsModule, CommentsModule,
    PromotionReviewsModule, CompanyReviewsModule, SeedModule, CommonModule,
    ManagementUsersModule,
    ManagementProductsModule
  ]
})
export class AppModule {}
