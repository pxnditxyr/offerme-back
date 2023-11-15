import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateCompanyInput, UpdateCompanyInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { SubparametersService } from 'src/parametrics/subparameters/subparameters.service'
import { User } from 'src/users/users/entities/user.entity'
import { Company } from './entities/company.entity'
import { IFindAllOptions } from 'src/common/interfaces'

const companyIncludes = {
  logos: true,
  phones: true,
  reviews: true,
  products: true,
  promotionRequests: true,
  promotions: true,
  companyType: true,
  documentType: true,
  creator: true,
  updater: true,
  addresses: true,
  categories: true,
}

@Injectable()
export class CompaniesService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly subparametersService : SubparametersService
  ) {}

  async create ( createCompanyInput : CreateCompanyInput, creator : User ) : Promise<Company> {
    const { companyTypeId, documentTypeId } = createCompanyInput
    await this.subparametersService.findOne( companyTypeId )
    if ( documentTypeId ) await this.subparametersService.findOne( documentTypeId )
    try {
      const company = await this.prismaService.companies.create({
        data: {
          ...createCompanyInput,
          createdBy: creator.id,
        }
      })
      return company
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }

  }

  async findAll ( { paginationArgs, searchArgs } : IFindAllOptions ) {
    const { limit, offset } = paginationArgs
    const { search } = searchArgs
    const companies = await this.prismaService.companies.findMany({
      include: { ...companyIncludes },
      where: {
        name: { contains: search || '', mode: 'insensitive' }
      },
      take: limit || undefined,
      skip: offset || undefined,
    })
    

    return companies
  }

  async findOne( id : string ) {
    const company = await this.prismaService.companies.findUnique({
      where: { id },
      include: { ...companyIncludes }
    })
    if ( !company ) throw new NotFoundException( `Company with id ${id} not found` )

    return company
  }

  async update( id : string, updateCompanyInput : UpdateCompanyInput, updater : User ) : Promise<Company> {
    await this.findOne( id )
    const { companyTypeId, documentTypeId } = updateCompanyInput
    if ( companyTypeId ) await this.subparametersService.findOne( companyTypeId )
    if ( documentTypeId ) await this.subparametersService.findOne( documentTypeId )
    try {
      const company = await this.prismaService.companies.update({
        where: { id },
        data: {
          ...updateCompanyInput,
          updatedBy: updater.id,
          }
      })
      return company
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string, updater : User ) : Promise<Company> {
    const currentCompany = await this.findOne( id )
    try {
      const company = await this.prismaService.companies.update({
        where: { id },
        data: {
          status: !currentCompany.status,
          updatedBy: updater.id,
        }
      })
      return company
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
