import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql'
import { CategoriesService } from './categories.service'
import { Category } from './entities/category.entity'
import { CreateCategoryInput, UpdateCategoryInput } from './dto/inputs'
import { ParseIntPipe, ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'

@Resolver( () => Category )
export class CategoriesResolver {
  constructor(
    private readonly categoriesService: CategoriesService
  ) {}

  @Mutation( () => Category )
  @UseGuards( JwtAuthGuard )
  async createCategory (
    @Args( 'createCategoryInput' ) createCategoryInput : CreateCategoryInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) {
    return await this.categoriesService.create( createCategoryInput, user )
  }

  @Query( () => [ Category ], { name: 'categories' } )
  async findAll (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs,
    @Args( 'order', { type: () => String, nullable: true } ) order? : string
  ) {
    return await this.categoriesService.findAll({ paginationArgs, searchArgs }, order )
  }

  @Query( () => Category, { name: 'category' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return await this.categoriesService.findOne( id )
  }

  @Mutation( () => Category )
  @UseGuards( JwtAuthGuard )
  async updateCategory(
    @Args( 'updateCategoryInput' ) updateCategoryInput : UpdateCategoryInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) {
    return this.categoriesService.update( updateCategoryInput.id, updateCategoryInput, user )
  }

  @Mutation( () => Category )
  @UseGuards( JwtAuthGuard )
  async toggleStatusCategory (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<Category> {
    return await this.categoriesService.toggleStatus( id, user )
  }
}
