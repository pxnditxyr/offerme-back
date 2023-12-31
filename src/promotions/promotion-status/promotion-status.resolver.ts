import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { PromotionStatusService } from './promotion-status.service'
import { PromotionStatus } from './entities/promotion-status.entity'
import { CreatePromotionStatusInput, StatusUpdatePromotionStatusInput, UpdatePromotionStatusInput } from './dto/inputs'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@UseGuards( JwtAuthGuard )
@Resolver( () => PromotionStatus )
export class PromotionStatusResolver {
  constructor (
    private readonly promotionStatusService: PromotionStatusService
  ) {}

  @Mutation( () => PromotionStatus )
  async createPromotionStatus (
    @Args( 'createPromotionStatusInput' ) createPromotionStatusInput : CreatePromotionStatusInput,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) creator : User
  ) : Promise<PromotionStatus> {
    return await this.promotionStatusService.create( createPromotionStatusInput, creator )
  }

  @Query( () => [ PromotionStatus ], { name: 'promotionStatuses' } )
  async findAll (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs,
  ) {
    return await this.promotionStatusService.findAll( { paginationArgs, searchArgs } )
  }

  @Query( () => [ PromotionStatus ], { name: 'promotionStatusesApproved' } )
  async findAllApproved (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs,
  ) {
    return await this.promotionStatusService.findAllApproved( { paginationArgs, searchArgs } )
  }

  @Query( () => [ PromotionStatus ], { name: 'promotionStatusesRejected' } )
  async findAllRejected (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs,
  ) {
    return await this.promotionStatusService.findAllRejected( { paginationArgs, searchArgs } )
  }

  @Query( () => [ PromotionStatus ], { name: 'promotionStatusesPending' } )
  async findAllPending (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs,
  ) {
    return await this.promotionStatusService.findAllPending( { paginationArgs, searchArgs } )
  }

  @Query( () => PromotionStatus, { name: 'promotionStates' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return this.promotionStatusService.findOne( id )
  }

  @Mutation( () => PromotionStatus )
  async updatePromotionStatus (
    @Args( 'updatePromotionStatusInput' ) updatePromotionStatusInput : UpdatePromotionStatusInput,
    @CurrentUser([ ValidRoles.ADMIN ]) updater : User
  ) : Promise<PromotionStatus> {
    return await this.promotionStatusService.update( updatePromotionStatusInput.id, updatePromotionStatusInput, updater )
  }

  @Mutation( () => PromotionStatus )
  async approvePromotionStatus (
    @Args( 'statusUpdatePromotionStatusInput' ) statusUpdatePromotionStatusInput : StatusUpdatePromotionStatusInput,
    @CurrentUser([ ValidRoles.ADMIN ]) updater : User
  ) : Promise<PromotionStatus> {
    return await this.promotionStatusService.approve( statusUpdatePromotionStatusInput.id, statusUpdatePromotionStatusInput, updater )
  }
  
  @Mutation( () => PromotionStatus )
  async rejectPromotionStatus (
    @Args( 'statusUpdatePromotionStatusInput' ) statusUpdatePromotionStatusInput : StatusUpdatePromotionStatusInput,
    @CurrentUser([ ValidRoles.ADMIN ]) updater : User
  ) : Promise<PromotionStatus> {
    return await this.promotionStatusService.reject( statusUpdatePromotionStatusInput.id, statusUpdatePromotionStatusInput, updater )
  }

  @Mutation( () => PromotionStatus )
  async toggleStatusPromotionStatus (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) updater : User
  ) : Promise<PromotionStatus> {
    return await this.promotionStatusService.toggleStatus( id, updater )
  }
}
