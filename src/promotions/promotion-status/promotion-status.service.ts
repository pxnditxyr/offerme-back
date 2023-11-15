import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreatePromotionStatusInput, StatusUpdatePromotionStatusInput, UpdatePromotionStatusInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { PromotionRequestsService } from '../promotion-requests/promotion-requests.service'
import { User } from 'src/users/users/entities/user.entity'
import { PromotionStatus } from '@prisma/client'
import { extractPrismaExceptions } from 'src/common/exception-catchers'
import { IFindAllOptions } from 'src/common/interfaces'

const promotionStatusIncludes = {
  promotionRequest: true,
  adminApproved: true,
  adminRejected: true,
  creator: true,
  updater: true,
}

@Injectable()
export class PromotionStatusService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly promotionRequestsService : PromotionRequestsService
  ) {}

  async create ( createPromotionStatusInput : CreatePromotionStatusInput, creator : User ) : Promise<PromotionStatus> {
    const { promotionRequestId } = createPromotionStatusInput
    await this.promotionRequestsService.findOne( promotionRequestId )
    try {
      const promotionStatus = await this.prismaService.promotionStatus.create({
        data: {
          ...createPromotionStatusInput,
          createdBy: creator.id,
        }
      })
      return promotionStatus
    } catch ( error ) {
      this.hendlerDBExceptions( error )
    }
  }

  async findAll ( { paginationArgs } : IFindAllOptions ) {
    const { limit, offset } = paginationArgs
    try {
      const promotionStatuses = await this.prismaService.promotionStatus.findMany({
        take: limit,
        skip: offset,
        include: { ...promotionStatusIncludes }
      })
      return promotionStatuses
    } catch ( error ) {
      this.hendlerDBExceptions( error )
    }
  }

  async findOne ( id : string ) {
    const promotionStatus = await this.prismaService.promotionStatus.findUnique({
      where: { id },
      include: { ...promotionStatusIncludes }
    })
    if ( !promotionStatus ) throw new NotFoundException( `Promotion Status with ID ${ id } not found` )
    return promotionStatus
  }

  async update ( id : string, updatePromotionStatusInput : UpdatePromotionStatusInput, updater : User ) : Promise<PromotionStatus> {
    await this.findOne( id )
    try {
      const promotionStatus = await this.prismaService.promotionStatus.update({
        where: { id },
        data: {
          ...updatePromotionStatusInput,
          updatedBy: updater.id,
        }
      })
      return promotionStatus
    } catch ( error ) {
      this.hendlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string, updater : User ) : Promise<PromotionStatus> {
    const currentPromotionStatus = await this.findOne( id )
    try {
      const promotionStatus = await this.prismaService.promotionStatus.update({
        where: { id },
        data: {
          status: !currentPromotionStatus.status,
          updatedBy: updater.id,
        }
      })
      return promotionStatus
    } catch ( error ) {
      this.hendlerDBExceptions( error )
    }
  }

  async approve ( id : string, statusUpdatePromotionStatusInput : StatusUpdatePromotionStatusInput, updater : User ) : Promise<PromotionStatus> {
    await this.findOne( id )
    try {
      const promotionStatus = await this.prismaService.promotionStatus.update({
        where: { id },
        data: {
          ...statusUpdatePromotionStatusInput,
          adminApprovedStatus: true,
          adminApprovedAt: new Date(),
          adminApprovedBy: updater.id,
          adminRejectedStatus: false,
          updatedBy: updater.id,
        }
      })
      return promotionStatus
    } catch ( error ) {
      this.hendlerDBExceptions( error )
    }
  }

  async reject ( id : string, statusUpdatePromotionStatusInput : StatusUpdatePromotionStatusInput, updater : User ) : Promise<PromotionStatus> {
    await this.findOne( id )
    try {
      const promotionStatus = await this.prismaService.promotionStatus.update({
        where: { id },
        data: {
          ...statusUpdatePromotionStatusInput,
          adminRejectedStatus: true,
          adminRejectedAt: new Date(),
          adminRejectedBy: updater.id,
          adminApprovedStatus: false,
          updatedBy: updater.id,
        }
      })
      return promotionStatus
    } catch ( error ) {
      this.hendlerDBExceptions( error )
    }
  }

  private hendlerDBExceptions ( error : any ) : never {
    console.error( error )
    const prismaErrors = extractPrismaExceptions( error )
    if ( prismaErrors ) throw new BadRequestException( prismaErrors )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
