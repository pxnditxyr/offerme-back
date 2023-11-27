import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreatePromotionRequestInput, UpdatePromotionRequestInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { SubparametersService } from 'src/parametrics/subparameters/subparameters.service'
import { CompaniesService } from 'src/companies/companies/companies.service'
import { User } from 'src/users/users/entities/user.entity'
import { PromotionRequest } from './entities/promotion-request.entity'
import { extractPrismaExceptions } from 'src/common/exception-catchers'
import { IFindAllOptions } from 'src/common/interfaces'

const promotionRequestIncludes = {
  images: true,
  company: true,
  currency: true,
  promotionType: true,
  creator: true,
  updater: true,
  promotionStatus: true,
  requestingUser: true,
  targetProducts: true,
  promotionPayments: true,
  discountProducts: true,
}

@Injectable()
export class PromotionRequestsService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly subparametersService : SubparametersService,
    private readonly companiesService : CompaniesService
  ) {}

  async create ( createPromotionRequestInput : CreatePromotionRequestInput, creator : User ) : Promise<PromotionRequest> {
    const { promotionTypeId, companyId, currencyId } = createPromotionRequestInput
    await this.subparametersService.findOne( currencyId )
    await this.subparametersService.findOne( promotionTypeId )
    await this.companiesService.findOne( companyId )
    try {
      const promotionRequest = await this.prismaService.promotionRequests.create({
        data: {
          ...createPromotionRequestInput,
          requestingUserId: creator.id,
          createdBy: creator.id
        }
      })
      return promotionRequest
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll ( { paginationArgs, searchArgs } : IFindAllOptions ) {
    const { limit, offset } = paginationArgs
    const { search, status } = searchArgs
    try {
      const promotionRequests = await this.prismaService.promotionRequests.findMany({
        take: limit ?? undefined,
        skip: offset ?? undefined,
        where: {
          OR: [
            { title: { contains: search || '', mode: 'insensitive' } },
            { description: { contains: search || '', mode: 'insensitive' } }
          ],
          status: status ?? undefined
        },
        include: { ...promotionRequestIncludes, promotionStatus: true },
      })
      return promotionRequests
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
      
  }

  async findOne ( id : string ) {
    const promotionRequest = await this.prismaService.promotionRequests.findUnique({
      where: { id },
      include: { ...promotionRequestIncludes, promotionStatus: true }
    })
    if ( !promotionRequest ) throw new NotFoundException( `Promotion request with ID ${ id } does not exists` )
    return promotionRequest
  }

  async update ( id : string, updatePromotionRequestInput : UpdatePromotionRequestInput, updater : User ) : Promise<PromotionRequest> {
    await this.findOne( id )
    const { promotionTypeId, companyId, currencyId } = updatePromotionRequestInput
    if ( promotionTypeId ) await this.subparametersService.findOne( promotionTypeId )
    if ( companyId ) await this.companiesService.findOne( companyId )
    if ( currencyId ) await this.subparametersService.findOne( currencyId )
    try {
      const promotionRequest = await this.prismaService.promotionRequests.update({
        where: { id },
        data: {
          ...updatePromotionRequestInput,
          updatedBy: updater.id
        },
      })
      return promotionRequest
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string, updater : User ) : Promise<PromotionRequest> {
    const currentPromotionRequest = await this.findOne( id )
    try {
      const promotionRequest = await this.prismaService.promotionRequests.update({
        where: { id },
        data: {
          status: !currentPromotionRequest.status,
          updatedBy: updater.id
        },
      })
      return promotionRequest
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
