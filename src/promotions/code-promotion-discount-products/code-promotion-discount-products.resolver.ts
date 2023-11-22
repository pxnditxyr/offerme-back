import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { CodePromotionDiscountProductsService } from './code-promotion-discount-products.service'
import { CodePromotionDiscountProduct } from './entities/code-promotion-discount-product.entity'
import { CreateCodePromotionDiscountProductInput, UpdateCodePromotionDiscountProductInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'

@UseGuards( JwtAuthGuard )
@Resolver( () => CodePromotionDiscountProduct )
export class CodePromotionDiscountProductsResolver {
  constructor (
    private readonly codePromotionDiscountProductsService: CodePromotionDiscountProductsService
  ) {}

  @Mutation( () => Boolean )
  async createCodePromotionDiscountProduct (
    @Args( 'createCodePromotionDiscountProductInput' ) createCodePromotionDiscountProductInput : CreateCodePromotionDiscountProductInput,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) creator : User
  ) : Promise<boolean> {
    return await this.codePromotionDiscountProductsService.create( createCodePromotionDiscountProductInput, creator )
  }

  @Query( () => [ CodePromotionDiscountProduct ], { name: 'codePromotionDiscountProducts' } )
  async findAll (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs
  ) { 
    return await this.codePromotionDiscountProductsService.findAll({ paginationArgs, searchArgs })
  }

  @Query( () => CodePromotionDiscountProduct, { name: 'codePromotionDiscountProduct' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return await this.codePromotionDiscountProductsService.findOne( id )
  }

  @Mutation( () => CodePromotionDiscountProduct )
  async updateCodePromotionDiscountProduct (
    @Args( 'updateCodePromotionDiscountProductInput' ) updateCodePromotionDiscountProductInput : UpdateCodePromotionDiscountProductInput,
    @CurrentUser([ ValidRoles.ADMIN ]) updater : User
  ) : Promise<CodePromotionDiscountProduct> {
    return await this.codePromotionDiscountProductsService.update( updateCodePromotionDiscountProductInput.id, updateCodePromotionDiscountProductInput, updater )
  }

  @Mutation( () => CodePromotionDiscountProduct )
  async getDiscountCoupon (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.USER ]) user : User
  ) : Promise<CodePromotionDiscountProduct> {
    return await this.codePromotionDiscountProductsService.redeemDiscountCoupon( id, user )
  }

  @Mutation( () => CodePromotionDiscountProduct )
  async redeemDiscountCoupon (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.SELLER ]) user : User
  ) : Promise<CodePromotionDiscountProduct> {
    return await this.codePromotionDiscountProductsService.redeemDiscountCoupon( id, user )
  }

  @Mutation( () => CodePromotionDiscountProduct )
  async forgetDiscountCoupon (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.USER ]) user : User
  ) : Promise<CodePromotionDiscountProduct> {
    return await this.codePromotionDiscountProductsService.forgetDiscountCoupon( id, user )
  }

  @Mutation( () => CodePromotionDiscountProduct )
  async toggleStatusCodePromotionDiscountProduct(
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) updater : User
  ) : Promise<CodePromotionDiscountProduct> {
    return await this.codePromotionDiscountProductsService.toggleStatus( id, updater )
  }
}
