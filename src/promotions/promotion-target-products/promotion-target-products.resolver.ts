import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { PromotionTargetProductsService } from './promotion-target-products.service'
import { PromotionTargetProduct } from './entities/promotion-target-product.entity'
import { CreatePromotionTargetProductInput, UpdatePromotionTargetProductInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'

@UseGuards( JwtAuthGuard )
@Resolver( () => PromotionTargetProduct )
export class PromotionTargetProductsResolver {
  constructor (
    private readonly promotionTargetProductsService : PromotionTargetProductsService
  ) {}

  @Mutation( () => PromotionTargetProduct )
  async createPromotionTargetProduct (
    @Args( 'createPromotionTargetProductInput' ) createPromotionTargetProductInput : CreatePromotionTargetProductInput,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) creator : User
  ) : Promise<PromotionTargetProduct> {
    return await this.promotionTargetProductsService.create( createPromotionTargetProductInput, creator )
  }

  @Query( () => [ PromotionTargetProduct ], { name: 'promotionTargetProducts' } )
  async findAll (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs
  ) {
    return await this.promotionTargetProductsService.findAll({ paginationArgs, searchArgs })
  }

  @Query( () => PromotionTargetProduct, { name: 'promotionTargetProduct' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return await this.promotionTargetProductsService.findOne( id )
  }

  @Mutation( () => PromotionTargetProduct )
  async updatePromotionTargetProduct (
    @Args( 'updatePromotionTargetProductInput' ) updatePromotionTargetProductInput : UpdatePromotionTargetProductInput,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) updater : User
  ) : Promise<PromotionTargetProduct> {
    return await this.promotionTargetProductsService.update( updatePromotionTargetProductInput.id, updatePromotionTargetProductInput, updater )
  }

  @Mutation( () => PromotionTargetProduct )
  async toggleStatusPromotionTargetProduct (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) updater : User
  ) {
    return await this.promotionTargetProductsService.toggleStatus( id, updater )
  }
}
