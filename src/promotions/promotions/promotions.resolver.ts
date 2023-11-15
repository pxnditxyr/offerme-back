import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { PromotionsService } from './promotions.service'
import { Promotion } from './entities/promotion.entity'
import { CreatePromotionInput, UpdatePromotionInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'

@UseGuards( JwtAuthGuard )
@Resolver( () => Promotion )
export class PromotionsResolver {
  constructor (
    private readonly promotionsService : PromotionsService
  ) {}

  @Mutation( () => Promotion )
  async createPromotion (
    @Args( 'createPromotionInput' ) createPromotionInput : CreatePromotionInput,
    @CurrentUser([ ValidRoles.ADMIN ]) creator : User
  ) : Promise<Promotion> {
    return await this.promotionsService.create( createPromotionInput, creator )
  }

  @Query( () => [ Promotion ], { name: 'promotions' } )
  async findAll (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs
  ) {
    return await this.promotionsService.findAll({ paginationArgs, searchArgs })
  }

  @Query( () => Promotion, { name: 'promotion' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return await this.promotionsService.findOne( id )
  }

  @Mutation( () => Promotion )
  async updatePromotion (
    @Args( 'updatePromotionInput' ) updatePromotionInput : UpdatePromotionInput,
    @CurrentUser([ ValidRoles.ADMIN ]) updater : User
  ) : Promise<Promotion> {
    return await this.promotionsService.update( updatePromotionInput.id, updatePromotionInput, updater )
  }

  @Mutation( () => Promotion )
  async toggleStatusPromotion (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) updater : User
  ) : Promise<Promotion> {
    return await this.promotionsService.toggleStatus( id, updater )
  }
}
