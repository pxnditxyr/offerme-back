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
    const { search } = searchArgs
    const products = await this.prismaService.products.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive'
        }
      },
      include: { ...productIncludes },
      take: limit,
      skip: offset
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

  async deactivate ( id : string, updater : User ) : Promise<Product> {
    await this.findOne( id )
    try {
      const product = await this.prismaService.products.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id
        }
      })
      return product
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.log( error )
    const prismaErrors = extractPrismaExceptions( error )
    if ( prismaErrors ) throw new BadRequestException( prismaErrors )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
