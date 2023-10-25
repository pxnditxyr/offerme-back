import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateDiscountProductInput, UpdateDiscountProductInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { DiscountProduct } from './entities/discount-product.entity'
import { ProductsService } from 'src/products/products/products.service'
import { PromotionRequestsService } from '../promotion-requests/promotion-requests.service'
import { extractPrismaExceptions } from 'src/common/exception-catchers'
import { User } from 'src/users/users/entities/user.entity'
import { IFindAllOptions } from 'src/common/interfaces'

const discountProductIncludes = {
  user: true,
  product: true,
  codePromotion: true,
  promotionRequest: true,
  creator: true,
  updater: true
}

@Injectable()
export class DiscountProductsService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly productsService : ProductsService,
    private readonly promotionRequestsService : PromotionRequestsService
  ) {}

  async create ( createDiscountProductInput : CreateDiscountProductInput, creator : User ) : Promise<DiscountProduct> {
    const { productId, promotionRequestId } = createDiscountProductInput
    await this.productsService.findOne( productId )
    await this.promotionRequestsService.findOne( promotionRequestId )
    try {
      const discountProduct = await this.prismaService.discountProducts.create({
        data: {
          ...createDiscountProductInput,
          userId: creator.id,
          createdBy: creator.id
        }
      })
      return discountProduct
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll ( { paginationArgs, searchArgs } : IFindAllOptions ) {
    const { limit, offset } = paginationArgs
    const { search } = searchArgs
    try {
      const discountProducts = await this.prismaService.discountProducts.findMany({
        skip: offset,
        take: limit,
        include: { ...discountProductIncludes },
        where: {
          promotionRequest: {
            title: { contains: search, mode: 'insensitive' }
          }
        }
      })
      return discountProducts
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findOne ( id : string ) {
    const discountProduct = await this.prismaService.discountProducts.findUnique({
      where: { id },
      include: { ...discountProductIncludes }
    })
    if ( !discountProduct ) throw new NotFoundException( `Discount Product with id ${ id } not found` )
    return discountProduct
  }

  async update( id : string, updateDiscountProductInput : UpdateDiscountProductInput, updater : User ) : Promise<DiscountProduct> {
    await this.findOne( id )
    const { productId, promotionRequestId } = updateDiscountProductInput
    if ( productId ) await this.productsService.findOne( productId )
    if ( promotionRequestId ) await this.promotionRequestsService.findOne( promotionRequestId )
    try {
      const discountProduct = await this.prismaService.discountProducts.update({
        where: { id },
        data: {
          ...updateDiscountProductInput,
          updatedBy: updater.id
        }
      })
      return discountProduct
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) : Promise<DiscountProduct> {
    await this.findOne( id )
    try {
      const discountProduct = await this.prismaService.discountProducts.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id
        }
      })
      return discountProduct
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
