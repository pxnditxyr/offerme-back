import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { PromotionRequestsService } from './promotion-requests.service'
import { PromotionRequest } from './entities/promotion-request.entity'
import { CreatePromotionRequestInput, UpdatePromotionRequestInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'

@Resolver( () => PromotionRequest )
export class PromotionRequestsResolver {
  constructor (
    private readonly promotionRequestsService : PromotionRequestsService
  ) {}

  @Mutation( () => PromotionRequest )
  @UseGuards( JwtAuthGuard )
  async createPromotionRequest (
    @Args( 'createPromotionRequestInput' ) createPromotionRequestInput : CreatePromotionRequestInput,
    @CurrentUser([ ValidRoles.COMPANY_REPRESENTATIVE, ValidRoles.ADMIN ]) creator : User
  ) : Promise<PromotionRequest> {
    return await this.promotionRequestsService.create( createPromotionRequestInput, creator )
  }

  @Query( () => [ PromotionRequest ], { name: 'promotionRequests' } )
  async findAll (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs
  ) {
    return await this.promotionRequestsService.findAll({ paginationArgs, searchArgs })
  }

  @Query( () => PromotionRequest, { name: 'promotionRequest' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return await this.promotionRequestsService.findOne( id )
  }

  @Mutation( () => PromotionRequest )
  @UseGuards( JwtAuthGuard )
  async updatePromotionRequest (
    @Args( 'updatePromotionRequestInput' ) updatePromotionRequestInput : UpdatePromotionRequestInput,
    @CurrentUser([ ValidRoles.COMPANY_REPRESENTATIVE, ValidRoles.ADMIN ]) updater : User
  ) : Promise<PromotionRequest> {
    return await this.promotionRequestsService.update( updatePromotionRequestInput.id, updatePromotionRequestInput, updater )
  }

  @Mutation( () => PromotionRequest )
  @UseGuards( JwtAuthGuard )
  async toggleStatusPromotionRequest (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.COMPANY_REPRESENTATIVE, ValidRoles.ADMIN ]) updater : User
  ) : Promise<PromotionRequest> {
    return await this.promotionRequestsService.toggleStatus( id, updater )
  }
}
