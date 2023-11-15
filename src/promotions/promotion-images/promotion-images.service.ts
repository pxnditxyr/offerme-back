import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreatePromotionImageInput, UpdatePromotionImageInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { PromotionRequestsService } from '../promotion-requests/promotion-requests.service'
import { PromotionImage } from './entities/promotion-image.entity'
import { User } from 'src/users/users/entities/user.entity'
import { extractPrismaExceptions } from 'src/common/exception-catchers'
import { IFindAllOptions } from 'src/common/interfaces'

const promotionImageIncludes = {
  promotionRequest: true,
  creator: true,
  updater: true
}

@Injectable()
export class PromotionImagesService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly promotionRequestsService : PromotionRequestsService
  ) {}

  async create ( createPromotionImageInput : CreatePromotionImageInput, creator : User ) : Promise<PromotionImage> {
    const { promotionRequestId } = createPromotionImageInput
    await this.promotionRequestsService.findOne( promotionRequestId )
    try {
      const promotionImage = await this.prismaService.promotionImages.create({
        data: {
          ...createPromotionImageInput,
          createdBy: creator.id
        }
      })
      return promotionImage
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll ( { paginationArgs, searchArgs } : IFindAllOptions ) {
    const { limit, offset } = paginationArgs
    const { search } = searchArgs
    try {
      const promotionImages = await this.prismaService.promotionImages.findMany({
        take: limit,
        skip: offset,
        where: {
          alt: { contains: search, mode: 'insensitive' }
        },
        include: { ...promotionImageIncludes }
      })
      return promotionImages
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findOne ( id : string ) {
    const promotionImage = await this.prismaService.promotionImages.findUnique({
      where: { id },
      include: { ...promotionImageIncludes }
    })
    if ( !promotionImage ) throw new NotFoundException( `PromotionImage with id ${ id } not found` )
    return promotionImage
  }

  async update ( id : string, updatePromotionImageInput : UpdatePromotionImageInput, updater : User ) {
    await this.findOne( id )
    const { promotionRequestId } = updatePromotionImageInput
    if ( promotionRequestId ) await this.promotionRequestsService.findOne( promotionRequestId )
    try {
      const promotionImage = await this.prismaService.promotionImages.update({
        where: { id },
        data: {
          ...updatePromotionImageInput,
          updatedBy: updater.id
        }
      })
      return promotionImage
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string, updater : User ) {
    const currentPromotionImage = await this.findOne( id )
    try {
      const promotionImage = await this.prismaService.promotionImages.update({
        where: { id },
        data: {
          status: !currentPromotionImage.status,
          updatedBy: updater.id
        }
      })
      return promotionImage
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
