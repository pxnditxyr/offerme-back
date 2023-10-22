import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { ProductCategoriesService } from './product-categories.service'
import { ProductCategory } from './entities/product-category.entity'
import { CreateProductCategoryInput, UpdateProductCategoryInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'

@UseGuards( JwtAuthGuard )
@Resolver( () => ProductCategory )
export class ProductCategoriesResolver {
  constructor (
    private readonly productCategoriesService : ProductCategoriesService
  ) {}

  @Mutation( () => ProductCategory )
  async createProductCategory (
    @Args( 'createProductCategoryInput' ) createProductCategoryInput : CreateProductCategoryInput,
    @CurrentUser([ ValidRoles.COMPANY_REPRESENTATIVE, ValidRoles.ADMIN ]) creator : User
  ) : Promise<ProductCategory> {
    return await this.productCategoriesService.create( createProductCategoryInput, creator )
  }

  @Query( () => [ ProductCategory ], { name: 'productCategories' } )
  async findAll (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs
  ) {
    return await this.productCategoriesService.findAll({ paginationArgs, searchArgs })
  }

  @Query( () => ProductCategory, { name: 'productCategory' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return await this.productCategoriesService.findOne( id )
  }

  @Mutation( () => ProductCategory )
  async updateProductCategory (
    @Args( 'updateProductCategoryInput' ) updateProductCategoryInput : UpdateProductCategoryInput,
    @CurrentUser([ ValidRoles.COMPANY_REPRESENTATIVE, ValidRoles.ADMIN ]) updater : User
  ) : Promise<ProductCategory> {
    return await this.productCategoriesService.update( updateProductCategoryInput.id, updateProductCategoryInput, updater )
  }

  @Mutation( () => ProductCategory )
  async deactivateProductCategory (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.COMPANY_REPRESENTATIVE, ValidRoles.ADMIN ]) updater : User
  ) : Promise<ProductCategory> {
    return await this.productCategoriesService.deactivate( id, updater )
  }
}
