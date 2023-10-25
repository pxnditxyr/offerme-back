import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { PromotionImagesService } from './promotion-images.service'
import { PromotionImage } from './entities/promotion-image.entity'
import { CreatePromotionImageInput, UpdatePromotionImageInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'

@UseGuards( JwtAuthGuard )
@Resolver( () => PromotionImage )
export class PromotionImagesResolver {

  constructor (
    private readonly promotionImagesService: PromotionImagesService
  ) {}

  @Mutation( () => PromotionImage )
  async createPromotionImage (
    @Args( 'createPromotionImageInput' ) createPromotionImageInput : CreatePromotionImageInput,
    @CurrentUser([ ValidRoles.COMPANY_REPRESENTATIVE, ValidRoles.ADMIN ]) creator : User 
  ) : Promise<PromotionImage> {
    return await this.promotionImagesService.create( createPromotionImageInput, creator )
  }

  @Query( () => [ PromotionImage ], { name: 'promotionImages' } )
  async findAll (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs
  ) {
    return await this.promotionImagesService.findAll({ paginationArgs, searchArgs })
  }

  @Query( () => PromotionImage, { name: 'promotionImage' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return await this.promotionImagesService.findOne( id )
  }

  @Mutation( () => PromotionImage )
  async updatePromotionImage (
    @Args( 'updatePromotionImageInput' ) updatePromotionImageInput : UpdatePromotionImageInput,
    @CurrentUser([ ValidRoles.COMPANY_REPRESENTATIVE, ValidRoles.ADMIN ]) updater : User
  ) {
    return await this.promotionImagesService.update( updatePromotionImageInput.id, updatePromotionImageInput, updater )
  }

  @Mutation( () => PromotionImage )
  async deactivatePromotionImage (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.COMPANY_REPRESENTATIVE, ValidRoles.ADMIN ]) updater : User
  ) {
    return this.promotionImagesService.deactivate( id, updater )
  }
}
