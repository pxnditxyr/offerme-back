import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateProductInput, UpdateProductInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { User } from 'src/users/users/entities/user.entity'
import { Product } from './entities/product.entity'
import { extractPrismaExceptions } from 'src/common/exception-catchers'
import { CompaniesService } from 'src/companies/companies/companies.service'
import { SubparametersService } from 'src/parametrics/subparameters/subparameters.service'
import { IFindAllOptions } from 'src/common/interfaces'

const productIncludes = {
  images: true,
  company: true,
  creator: true,
  updater: true,
  categories: true,
  productType: true,
  discountProducts: true,
  promotionRequests: true
}

@Injectable()
export class ProductsService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly companiesService : CompaniesService,
    private readonly subparametersService : SubparametersService
  ) {}

  async create( createProductInput : CreateProductInput, creator : User ) : Promise<Product> {
    const { companyId, productTypeId } = createProductInput
    await this.companiesService.findOne( companyId )
    await this.subparametersService.findOne( productTypeId )
    try {
      const product = await this.prismaService.products.create({
        data: {
          ...createProductInput,
          createdBy: creator.id
        }
      })
      return product
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll ( { searchArgs, paginationArgs } : IFindAllOptions ) {
    const { limit, offset } = paginationArgs
    const { search, status } = searchArgs


    const products = await this.prismaService.products.findMany({
      where: {
        OR: [
          { name: { contains: search ?? '', mode: 'insensitive' } },
          { description: { contains: search ?? '', mode: 'insensitive' } },
          { code: { contains: search ?? '', mode: 'insensitive' } }
        ],
        status: status ?? undefined
      },
      include: { ...productIncludes },
      take: limit ?? undefined,
      skip: offset ?? undefined,
    })
    return products
  }

  async findByCompany ( companyId : string ) {
    const products = await this.prismaService.products.findMany({
      where: { companyId, status: true },
      include: { ...productIncludes }
    })
    return products
  }

  async findOne ( id : string ) {
    // TODO: try { const ... } catch ( error ) { handler } if ( !exists ) NotFoundException
    const product = await this.prismaService.products.findUnique({
      where: { id },
      include: { ...productIncludes }
    })
    if ( !product ) throw new NotFoundException( `Product with id ${ id } not found` )
    return product
  }

  async update ( id : string, updateProductInput : UpdateProductInput, updater : User ) : Promise<Product> {
    await this.findOne( id )
    const { companyId, productTypeId } = updateProductInput
    if ( companyId ) await this.companiesService.findOne( companyId )
    if ( productTypeId ) await this.subparametersService.findOne( productTypeId )
    try {
      const product = await this.prismaService.products.update({
        where: { id },
        data: {
          ...updateProductInput,
          updatedBy: updater.id
        }
      })
      return product
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string, updater : User ) : Promise<Product> {
    const currentProduct = await this.findOne( id )
    try {
      const product = await this.prismaService.products.update({
        where: { id },
        data: {
          status: !currentProduct.status,
          updatedBy: updater.id
        }
      })
      return product
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
