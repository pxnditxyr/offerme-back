import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { PromotionPaymentsService } from './promotion-payments.service'
import { PromotionPayment } from './entities/promotion-payment.entity'
import { CreatePromotionPaymentInput, UpdatePromotionPaymentInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'

@UseGuards( JwtAuthGuard )
@Resolver( () => PromotionPayment )
export class PromotionPaymentsResolver {
  constructor (
    private readonly promotionPaymentsService: PromotionPaymentsService
  ) {}

  @Mutation( () => PromotionPayment )
  async createPromotionPayment (
    @Args( 'createPromotionPaymentInput' ) createPromotionPaymentInput : CreatePromotionPaymentInput,
    @CurrentUser([ ValidRoles.COMPANY_REPRESENTATIVE ]) creator : User
  ) : Promise<PromotionPayment> {
    return await this.promotionPaymentsService.create( createPromotionPaymentInput, creator )
  }

  @Query( () => [ PromotionPayment ], { name: 'promotionPayments' } )
  async findAll (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs
  ) {
    return await this.promotionPaymentsService.findAll({ paginationArgs, searchArgs })
  }

  @Query( () => PromotionPayment, { name: 'promotionPayment' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return await this.promotionPaymentsService.findOne( id )
  }

  @Mutation( () => PromotionPayment )
  async updatePromotionPayment (
    @Args( 'updatePromotionPaymentInput' ) updatePromotionPaymentInput : UpdatePromotionPaymentInput,
    @CurrentUser([ ValidRoles.COMPANY_REPRESENTATIVE ]) updater : User
  ) : Promise<PromotionPayment> {
    return await this.promotionPaymentsService.update( updatePromotionPaymentInput.id, updatePromotionPaymentInput, updater )
  }

  @Mutation( () => PromotionPayment )
  async deactivatePromotionPayment (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.COMPANY_REPRESENTATIVE ]) updater : User
  ) : Promise<PromotionPayment> {
    return await this.promotionPaymentsService.deactivate( id, updater )
  }
}
