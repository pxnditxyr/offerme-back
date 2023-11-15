import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { ProductsService } from './products.service'
import { Product } from './entities/product.entity'
import { CreateProductInput, UpdateProductInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'

@UseGuards( JwtAuthGuard )
@Resolver( () => Product )
export class ProductsResolver {
  constructor (
    private readonly productsService : ProductsService
  ) {}

  @Mutation( () => Product )
  async createProduct (
    @Args( 'createProductInput' ) createProductInput : CreateProductInput,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) creator : User
  ) : Promise<Product> {
    return await this.productsService.create( createProductInput, creator )
  }

  @Query( () => [ Product ], { name: 'products' } )
  async findAll (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs
  ) {
    return await this.productsService.findAll({ paginationArgs, searchArgs })
  }

  @Query( () => Product, { name: 'product' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return await this.productsService.findOne( id )
  }

  @Mutation( () => Product )
  async updateProduct (
    @Args( 'updateProductInput' ) updateProductInput : UpdateProductInput,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) updater : User
  ) {
    return await this.productsService.update( updateProductInput.id, updateProductInput, updater )
  }

  @Mutation( () => Product )
  async toggleStatusProduct (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) updater : User
  ) {
    return await this.productsService.toggleStatus( id, updater )
  }
}
