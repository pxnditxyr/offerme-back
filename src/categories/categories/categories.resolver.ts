import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { CategoriesService } from './categories.service'
import { Category } from './entities/category.entity'
import { CreateCategoryInput, UpdateCategoryInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'

@UseGuards( JwtAuthGuard )
@Resolver( () => Category )
export class CategoriesResolver {
  constructor(
    private readonly categoriesService: CategoriesService
  ) {}

  @Mutation( () => Category )
  async createCategory (
    @Args( 'createCategoryInput' ) createCategoryInput : CreateCategoryInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) {
    return await this.categoriesService.create( createCategoryInput, user )
  }

  @Query( () => [ Category ], { name: 'categories' } )
  async findAll () {
    return await this.categoriesService.findAll()
  }

  @Query( () => Category, { name: 'category' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return await this.categoriesService.findOne( id )
  }

  @Mutation( () => Category )
  async updateCategory(
    @Args( 'updateCategoryInput' ) updateCategoryInput : UpdateCategoryInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) {
    return this.categoriesService.update( updateCategoryInput.id, updateCategoryInput, user )
  }

  @Mutation( () => Category )
  async deactivateCategory (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) {
    return await this.categoriesService.deactivate( id, user )
  }
}
