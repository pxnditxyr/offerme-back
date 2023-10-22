import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateProductCategoryInput, UpdateProductCategoryInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { ProductsService } from '../products/products.service'
import { CategoriesService } from 'src/categories/categories/categories.service'
import { User } from 'src/users/users/entities/user.entity'
import { ProductCategory } from './entities/product-category.entity'
import { extractPrismaExceptions } from 'src/common/exception-catchers'
import { IFindAllOptions } from 'src/common/interfaces'

const productCategoryIncludes = {
  product: true,
  category: true,
  creator: true,
  updater: true,
}

@Injectable()
export class ProductCategoriesService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly productsService : ProductsService,
    private readonly categoriesService : CategoriesService
  ) {}

  async create ( createProductCategoryInput : CreateProductCategoryInput, creator : User ) : Promise<ProductCategory> {
    const { productId, categoryId } = createProductCategoryInput
    await this.productsService.findOne( productId )
    await this.categoriesService.findOne( categoryId )
    try {
      const productCategory = await this.prismaService.productCategories.create({
        data: {
          ...createProductCategoryInput,
          createdBy: creator.id,
        }
      })
      return productCategory
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll ( { paginationArgs } : IFindAllOptions ) {
    const { limit, offset } = paginationArgs
    // TODO: add search by for all sub-modules
    try {
      const productCategories = await this.prismaService.productCategories.findMany({
        include: { ...productCategoryIncludes },
        take: limit,
        skip: offset,
      })
      return productCategories
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findOne ( id : string ) {
    const productCategory = await this.prismaService.productCategories.findUnique({
      where: { id },
      include: { ...productCategoryIncludes },
    })
    if ( !productCategory ) throw new NotFoundException( `Product category with ID ${ id } not found` )
    return productCategory
  }

  async update ( id : string, updateProductCategoryInput : UpdateProductCategoryInput, updater : User ) : Promise<ProductCategory> {
    const { productId, categoryId } = updateProductCategoryInput
    if ( productId ) await this.productsService.findOne( productId )
    if ( categoryId ) await this.categoriesService.findOne( categoryId )
    try {
      const productCategory = await this.prismaService.productCategories.update({
        where: { id },
        data: {
          ...updateProductCategoryInput,
          updatedBy: updater.id,
        }
      })
      return productCategory
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) : Promise<ProductCategory> {
    try {
      const productCategory = await this.prismaService.productCategories.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id,
        }
      })
      return productCategory
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
