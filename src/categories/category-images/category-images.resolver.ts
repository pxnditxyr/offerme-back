import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql'
import { CategoryImagesService } from './category-images.service'
import { CategoryImage } from './entities/category-image.entity'
import { CreateCategoryImageInput, UpdateCategoryImageInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'

@UseGuards( JwtAuthGuard )
@Resolver( () => CategoryImage )
export class CategoryImagesResolver {
  constructor (
    private readonly categoryImagesService: CategoryImagesService
  ) {}

  @Mutation( () => CategoryImage )
  async createCategoryImage(
    @Args( 'createCategoryImageInput' ) createCategoryImageInput : CreateCategoryImageInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) {
    return await this.categoryImagesService.create( createCategoryImageInput, user )
  }

  @Query( () => [ CategoryImage ], { name: 'categoryImages' } )
  async findAll (
    @CurrentUser([ ValidRoles.ADMIN ]) _user : User
  ) {
    return await this.categoryImagesService.findAll()
  }

  @Query( () => CategoryImage, { name: 'categoryImage' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string ) {
    return await this.categoryImagesService.findOne( id )
  }

  @Mutation( () => CategoryImage )
  async updateCategoryImage(
    @Args( 'updateCategoryImageInput' ) updateCategoryImageInput : UpdateCategoryImageInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) {
    return await this.categoryImagesService.update( updateCategoryImageInput.id, updateCategoryImageInput, user )
  }

  @Mutation(() => CategoryImage)
  async deactivateCategoryImage(
    @Args('id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) {
    return this.categoryImagesService.deactivate( id, user )
  }
}
