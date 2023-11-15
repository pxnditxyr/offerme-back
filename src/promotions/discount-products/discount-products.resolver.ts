import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { DiscountProductsService } from './discount-products.service'
import { DiscountProduct } from './entities/discount-product.entity'
import { CreateDiscountProductInput, UpdateDiscountProductInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'

@UseGuards( JwtAuthGuard )
@Resolver( () => DiscountProduct )
export class DiscountProductsResolver {
  constructor (
    private readonly discountProductsService: DiscountProductsService
  ) {}

  @Mutation( () => DiscountProduct )
  async createDiscountProduct (
    @Args( 'createDiscountProductInput' ) createDiscountProductInput : CreateDiscountProductInput,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) creator : User
  ) : Promise<DiscountProduct> {
    return await this.discountProductsService.create( createDiscountProductInput, creator )
  }

  @Query( () => [ DiscountProduct ], { name: 'discountProducts' } )
  async findAll (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs
  ) {
    return await this.discountProductsService.findAll({ paginationArgs, searchArgs })
  }

  @Query( () => DiscountProduct, { name: 'discountProduct' } )
  async findOne(
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return await this.discountProductsService.findOne( id )
  }

  @Mutation( () => DiscountProduct )
  async updateDiscountProduct (
    @Args( 'updateDiscountProductInput' ) updateDiscountProductInput : UpdateDiscountProductInput,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) updater : User
  ) : Promise<DiscountProduct> {
    return await this.discountProductsService.update( updateDiscountProductInput.id, updateDiscountProductInput, updater )
  }

  @Mutation( () => DiscountProduct )
  async toggleStatusDiscountProduct (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) updater : User
  ) : Promise<DiscountProduct> {
    return await this.discountProductsService.toggleStatus( id, updater )
  }
}
