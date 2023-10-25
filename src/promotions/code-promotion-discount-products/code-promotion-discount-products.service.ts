import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateCodePromotionDiscountProductInput, UpdateCodePromotionDiscountProductInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { User } from 'src/users/users/entities/user.entity'
import { CodePromotionDiscountProduct } from './entities/code-promotion-discount-product.entity'
import { DiscountProductsService } from '../discount-products/discount-products.service'
import { extractPrismaExceptions } from 'src/common/exception-catchers'
import { IFindAllOptions } from 'src/common/interfaces'

const codePromotionDiscountProductIncludes = {
  discountProduct: true,
  user: true,
  creator: true,
  updater: true
}

@Injectable()
export class CodePromotionDiscountProductsService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly discountProductsService : DiscountProductsService
  ) {}

  async create( createCodePromotionDiscountProductInput : CreateCodePromotionDiscountProductInput, creator : User ) : Promise<CodePromotionDiscountProduct> {
    const { discountProductId } = createCodePromotionDiscountProductInput
    await this.discountProductsService.findOne( discountProductId )
    try {
      const codePromotionDiscountProducts = await this.prismaService.codePromotionDiscountProducts.create({
        data: {
          ...createCodePromotionDiscountProductInput,
          createdBy: creator.id,
        }
      })
      return codePromotionDiscountProducts
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll ( { paginationArgs, searchArgs } : IFindAllOptions ) {
    const { limit, offset } = paginationArgs
    const { search } = searchArgs
    try {
      const codePromotionDiscountProducts = await this.prismaService.codePromotionDiscountProducts.findMany({
        skip: offset,
        take: limit,
        where: {
          discountProduct: {
            title: { contains: search, mode: 'insensitive' }
          }
        },
        include: { ...codePromotionDiscountProductIncludes }
      }) 
      return codePromotionDiscountProducts
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findOne( id : string ) {
    const codePromotionDiscountProduct = await this.prismaService.codePromotionDiscountProducts.findUnique({
      where: { id },
      include: { ...codePromotionDiscountProductIncludes }
    })
    if ( codePromotionDiscountProduct ) throw new NotFoundException( `Code Promotion Discount Product with id ${ id } not found` )
    return codePromotionDiscountProduct
  }

  async update ( id : string, updateCodePromotionDiscountProductInput : UpdateCodePromotionDiscountProductInput, updater : User ) : Promise<CodePromotionDiscountProduct> {
    await this.findOne( id )
    const { discountProductId } = updateCodePromotionDiscountProductInput
    if ( discountProductId ) await this.discountProductsService.findOne( discountProductId )
    try {
      const codePromotionDiscountProducts = await this.prismaService.codePromotionDiscountProducts.update({
        where: { id },
        data: {
          ...updateCodePromotionDiscountProductInput,
          updatedBy: updater.id
        }
      })
      return codePromotionDiscountProducts
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) : Promise<CodePromotionDiscountProduct> {
    await this.findOne( id )
    try {
      const codePromotionDiscountProducts = await this.prismaService.codePromotionDiscountProducts.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id
        }
      })
      return codePromotionDiscountProducts
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async redeemDiscountCoupon ( id : string, user : User ) : Promise<CodePromotionDiscountProduct> {
    await this.findOne( id )
    try {
      const codePromotionDiscountProducts = await this.prismaService.codePromotionDiscountProducts.update({
        where: { id },
        data: {
          used: true,
          usedAt: new Date(),
          usedBy: user.id,
          updatedBy: user.id,
        }
      })
      return codePromotionDiscountProducts
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }


  async forgetDiscountCoupon ( id : string, user : User ) : Promise<CodePromotionDiscountProduct> {
    await this.findOne( id )
    try {
      const codePromotionDiscountProducts = await this.prismaService.codePromotionDiscountProducts.update({
        where: { id },
        data: {
          used: false,
          updatedBy: user.id,
        }
      })
      return codePromotionDiscountProducts
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
