import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreatePromotionInput, UpdatePromotionInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { SubparametersService } from 'src/parametrics/subparameters/subparameters.service'
import { User } from 'src/users/users/entities/user.entity'
import { Promotion } from './entities/promotion.entity'
import { UsersService } from 'src/users/users/users.service'
import { CompaniesService } from 'src/companies/companies/companies.service'
import { PromotionPaymentsService } from '../promotion-payments/promotion-payments.service'
import { extractPrismaExceptions } from 'src/common/exception-catchers'
import { IFindAllOptions } from 'src/common/interfaces'
import { PromotionRequestsService } from '../promotion-requests/promotion-requests.service'

const promotionIncludes = {
  promotionType: true,
  company: true,
  user: true,
  promotionPayment: true,
  creator: true,
  updater: true
}

@Injectable()
export class PromotionsService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly subparametersService : SubparametersService,
    private readonly usersService : UsersService,
    private readonly companiesService : CompaniesService,
    private readonly promotionPaymentsService : PromotionPaymentsService,
    private readonly promotionRequestsService : PromotionRequestsService
  ) {}

  async create ( createPromotionInput : CreatePromotionInput, creator : User ) : Promise<Promotion> {
    const { companyId, promotionTypeId, promotionPaymentId, promotionRequestId } = createPromotionInput
    await this.companiesService.findOne( companyId )
    await this.subparametersService.findOne( promotionTypeId )
    await this.promotionPaymentsService.findOne( promotionPaymentId )
    await this.promotionRequestsService.findOne( promotionRequestId )
    try {
      const promotion = await this.prismaService.promotions.create({
        data: {
          ...createPromotionInput,
          createdBy: creator.id,
          userId: creator.id
        }
      })
      return promotion
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }

  }

  async findAll ( { paginationArgs, searchArgs } : IFindAllOptions ) {
    const { limit, offset } = paginationArgs
    const { search, status  } = searchArgs
    try {
      const promotions = await this.prismaService.promotions.findMany({
        take: limit ?? undefined,
        skip: offset ?? undefined,
        where: {
          OR: [
            { title: { contains: search || '', mode: 'insensitive' } },
            { description: { contains: search || '', mode: 'insensitive' } },
            { code: { contains: search || '', mode: 'insensitive' } }
          ],
          status: status ?? undefined
        },
        include: { ...promotionIncludes },
        orderBy: { updatedBy: 'desc' }
      })
      return promotions
    } catch ( error ) {
      this.handlerDBExceptions( error )
    } }

  async findOne ( id : string ) : Promise<Promotion> {
    const promotion = await this.prismaService.promotions.findUnique({
      where: { id },
      include: { ...promotionIncludes }
    })
    if ( !promotion ) throw new NotFoundException( `Promotion with ID ${ id } not found` )
    return promotion
  }

  async update ( id : string, updatePromotionInput : UpdatePromotionInput, updater : User ) : Promise<Promotion> {
    await this.findOne( id )
    const { companyId, promotionTypeId, promotionPaymentId, promotionRequestId } = updatePromotionInput
    if ( companyId ) await this.companiesService.findOne( companyId )
    if ( promotionTypeId ) await this.subparametersService.findOne( promotionTypeId )
    if ( promotionPaymentId ) await this.promotionPaymentsService.findOne( promotionPaymentId )
    if ( promotionRequestId ) await this.promotionRequestsService.findOne( promotionRequestId )
    try {
      const promotion = await this.prismaService.promotions.update({
        where: { id },
        data: {
          ...updatePromotionInput,
          updatedBy: updater.id
        }
      })
      return promotion
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string, updater : User ) : Promise<Promotion> {
    const currentPromotions = await this.findOne( id )
    try {
      const promotion = await this.prismaService.promotions.update({
        where: { id },
        data: {
          status: !currentPromotions.status,
          updatedBy: updater.id
        }
      })
      return promotion
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }
  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    const prismaErrors = extractPrismaExceptions( error )
    if ( prismaErrors ) throw new BadRequestException( prismaErrors )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
