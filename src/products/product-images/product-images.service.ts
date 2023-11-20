import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateProductImageInput, UpdateProductImageInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { User } from 'src/users/users/entities/user.entity'
import { ProductImage } from './entities/product-image.entity'
import { ProductsService } from '../products/products.service'
import { extractPrismaExceptions } from 'src/common/exception-catchers'
import { IFindAllOptions } from 'src/common/interfaces'

const productImageIncludes = {
  product: true,
  creator: true,
  updater: true,
}

@Injectable()
export class ProductImagesService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly productsService : ProductsService
  ) {}

  async create( createProductImageInput : CreateProductImageInput, creator : User ) : Promise<ProductImage> {
    const { productId } = createProductImageInput
    await this.productsService.findOne( productId )
    try {
      await this.changeMainImage( productId, creator )
      const productImage = await this.prismaService.productImages.create({
        data: {
          ...createProductImageInput,
          createdBy: creator.id,
        }
      })
      return productImage
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll ( { paginationArgs } : IFindAllOptions ) {
    const { limit, offset } = paginationArgs
    try {
      const productImages = await this.prismaService.productImages.findMany({
        include: { ...productImageIncludes },
        take: limit,
        skip: offset,
        orderBy: { updatedBy: 'desc' },
      })
      return productImages
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findOne ( id : string ) {
    const productImage = await this.prismaService.productImages.findUnique({
      where: { id },
      include: { ...productImageIncludes },
    })
    if ( !productImage ) throw new NotFoundException( `Product image with ID ${ id } does not exist` )
    return productImage
  }

  async update ( id : string, updateProductImageInput : UpdateProductImageInput, updater : User ) : Promise<ProductImage> {
    await this.findOne( id )
    const { productId } = updateProductImageInput
    if ( productId ) await this.productsService.findOne( productId )
    try {
      const productImage = await this.prismaService.productImages.update({
        where: { id },
        data: {
          ...updateProductImageInput,
          updatedBy: updater.id,
        }
      })
      return productImage
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string, updater : User ) : Promise<ProductImage> {
    const currentProductImage = await this.findOne( id )
    try {
      const productImage = await this.prismaService.productImages.update({
        where: { id },
        data: {
          status: !currentProductImage.status,
          updatedBy: updater.id,
        }
      })
      return productImage
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private async changeMainImage ( productId : string, updater : User ) {
    const mainImage = await this.prismaService.productImages.findFirst({
      where: {
        productId,
        isMain: true,
      }
    })
    if ( mainImage ) {
      await this.prismaService.productImages.update({
        where: { id: mainImage.id },
        data: {
          isMain: false,
          updatedBy: updater.id,
        }
      })
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    const prismaErrors = extractPrismaExceptions( error )
    if ( prismaErrors ) throw new BadRequestException( prismaErrors )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
