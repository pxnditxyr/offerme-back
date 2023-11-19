import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreatePromotionPaymentInput, UpdatePromotionPaymentInput } from './dto/inputs'
import { User } from 'src/users/users/entities/user.entity'
import { PromotionPayment } from './entities/promotion-payment.entity'
import { extractPrismaExceptions } from 'src/common/exception-catchers'
import { PrismaService } from 'src/prisma'
import { PromotionRequestsService } from '../promotion-requests/promotion-requests.service'
import { SubparametersService } from 'src/parametrics/subparameters/subparameters.service'
import { CreditCardsService } from 'src/payments/credit-cards/credit-cards.service'
import { IFindAllOptions } from 'src/common/interfaces'

const promotionPaymentIncludes = {
  promotionRequest: true,
  paymentMethod: true,
  creditCard: true,
  creator: true,
  updater: true,
}


@Injectable()
export class PromotionPaymentsService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly promotionRequestsService : PromotionRequestsService,
    private readonly subparamatersService : SubparametersService,
    private readonly creditCardsService : CreditCardsService
  ) {}

  async create ( createPromotionPaymentInput : CreatePromotionPaymentInput, creator : User ) : Promise<PromotionPayment> {
    const { creditCardId, promotionRequestId, paymentMethodId } = createPromotionPaymentInput
    await this.promotionRequestsService.findOne( promotionRequestId )
    await this.subparamatersService.findOne( paymentMethodId )
    if ( creditCardId ) await this.creditCardsService.findOne( creditCardId )
    try {
      const promotionPayment = await this.prismaService.promotionPayments.create({
        data: {
          ...createPromotionPaymentInput,
          createdBy: creator.id,
        }
      })
      return promotionPayment
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll ( { paginationArgs, searchArgs } : IFindAllOptions ) {
    const { limit, offset } = paginationArgs
    const { status } = searchArgs
    try {
      const promotionPayments = await this.prismaService.promotionPayments.findMany({
        take: limit ?? undefined,
        skip: offset ?? undefined,
        where: {
          status: status ?? undefined,
        },
        include: { ...promotionPaymentIncludes }
      })
      return promotionPayments
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findOne ( id : string ) {
    const promotionPayment = await this.prismaService.promotionPayments.findUnique({
      where: { id },
      include: { ...promotionPaymentIncludes }
    })
    if ( !promotionPayment ) throw new NotFoundException( `Promotion payment with ID ${ id } not found` )
    return promotionPayment
  }

  async update ( id : string, updatePromotionPaymentInput : UpdatePromotionPaymentInput, updater : User ) : Promise<PromotionPayment> {
    const { creditCardId, paymentMethodId, promotionRequestId } = updatePromotionPaymentInput
    if ( creditCardId ) await this.creditCardsService.findOne( creditCardId )
    if ( paymentMethodId ) await this.subparamatersService.findOne( paymentMethodId )
    if ( promotionRequestId ) await this.promotionRequestsService.findOne( promotionRequestId )
    try {
      const promotionPayment = await this.prismaService.promotionPayments.update({
        where: { id },
        data: {
          ...updatePromotionPaymentInput,
          updatedBy: updater.id
        }
      })
      return promotionPayment
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) : Promise<PromotionPayment> {
    try {
      const promotionPayment = await this.prismaService.promotionPayments.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id
        }
      })
      return promotionPayment
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    const prismaErrors = extractPrismaExceptions( error )
    if ( prismaErrors ) throw new BadRequestException( prismaErrors )
    throw new InternalServerErrorException( 'Unexcepted error, please check logs' )
  }
}
