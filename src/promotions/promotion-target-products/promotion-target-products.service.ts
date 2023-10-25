import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreatePromotionTargetProductInput, UpdatePromotionTargetProductInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { PromotionRequestsService } from '../promotion-requests/promotion-requests.service'
import { ProductsService } from 'src/products/products/products.service'
import { User } from 'src/users/users/entities/user.entity'
import { PromotionTargetProduct } from './entities/promotion-target-product.entity'
import { extractPrismaExceptions } from 'src/common/exception-catchers'
import { IFindAllOptions } from 'src/common/interfaces'

const promotionTargetProductIncludes = {
  promotionRequest: true,
  product: true,
  creator: true,
  updater: true
}
@Injectable()
export class PromotionTargetProductsService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly promotionRequestsService : PromotionRequestsService,
    private readonly productsService : ProductsService
  ) {}
  
  async create ( createPromotionTargetProductInput : CreatePromotionTargetProductInput, creator : User ) : Promise<PromotionTargetProduct> {
    const { promotionRequestId, productId } = createPromotionTargetProductInput
    await this.promotionRequestsService.findOne( promotionRequestId )
    await this.productsService.findOne( productId )
    try {
      const promotionTargetProduct = await this.prismaService.promotionTargetProducts.create({
        data: {
          ...createPromotionTargetProductInput,
          createdBy: creator.id,
        }
      })
      return promotionTargetProduct
    } catch ( error ) {
      this.hendlerDBExceptions( error )
    }
  }

  async findAll ( { paginationArgs, searchArgs } : IFindAllOptions ) {
    const { limit, offset } = paginationArgs
    const { search } = searchArgs
    try {
      const promotionTargetProducts = await this.prismaService.promotionTargetProducts.findMany({
        take: limit,
        skip: offset,
        where: {
          description: { contains: search }
        },
        include: { ...promotionTargetProductIncludes }
      })
      return promotionTargetProducts
    } catch ( error ) {
      this.hendlerDBExceptions( error )
    }
  }

  async findOne ( id : string ) {
    const promotionTargetProduct = await this.prismaService.promotionTargetProducts.findUnique({
      where: { id },
      include: { ...promotionTargetProductIncludes }
    })
    if ( !promotionTargetProduct ) throw new NotFoundException( `Promotion Target Product with ID ${ id } not found` )
    return promotionTargetProduct
  }

  async update ( id : string, updatePromotionTargetProductInput : UpdatePromotionTargetProductInput, updater : User ) : Promise<PromotionTargetProduct> {
    await this.findOne( id )
    const { promotionRequestId, productId } = updatePromotionTargetProductInput
    if ( promotionRequestId ) await this.promotionRequestsService.findOne( promotionRequestId )
    if ( productId ) await this.productsService.findOne( productId )
    try {
      const promotionTargetProduct = await this.prismaService.promotionTargetProducts.update({
        where: { id },
        data: {
          ...updatePromotionTargetProductInput,
          updatedBy: updater.id,
        },
      })
      return promotionTargetProduct
    } catch ( error ) {
      this.hendlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) : Promise<PromotionTargetProduct> {
    await this.findOne( id )
    try {
      const promotionTargetProduct = await this.prismaService.promotionTargetProducts.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id,
        },
      })
      return promotionTargetProduct
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
