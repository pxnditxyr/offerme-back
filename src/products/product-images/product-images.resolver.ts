import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { ProductImagesService } from './product-images.service'
import { ProductImage } from './entities/product-image.entity'
import { CreateProductImageInput, UpdateProductImageInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'
import { User } from 'src/users/users/entities/user.entity'

@UseGuards( JwtAuthGuard )
@Resolver( () => ProductImage )
export class ProductImagesResolver {
  constructor (
    private readonly productImagesService: ProductImagesService
  ) {}

  @Mutation( () => ProductImage )
  async createProductImage (
    @Args( 'createProductImageInput' ) createProductImageInput : CreateProductImageInput,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) creator : User
  ) : Promise<ProductImage> {
    return await this.productImagesService.create( createProductImageInput, creator )
  }

  @Query( () => [ ProductImage ], { name: 'productImages' } )
  async findAll (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs
  ) {
    return await this.productImagesService.findAll({ paginationArgs, searchArgs })
  }

  @Query( () => ProductImage, { name: 'productImage' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) : Promise<ProductImage> {
    return await this.productImagesService.findOne( id )
  }

  @Mutation( () => ProductImage )
  async updateProductImage (
    @Args( 'updateProductImageInput' ) updateProductImageInput : UpdateProductImageInput,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) updater : User
  ) : Promise<ProductImage> {
    return await this.productImagesService.update( updateProductImageInput.id, updateProductImageInput, updater )
  }

  @Mutation( () => ProductImage )
  async toggleStatusProductImage (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) updater : User
  ) : Promise<ProductImage> {
    return await this.productImagesService.toggleStatus( id, updater )
  }
}
