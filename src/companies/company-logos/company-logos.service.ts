import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateCompanyLogoInput, UpdateCompanyLogoInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { CompanyLogo } from './entities/company-logo.entity'
import { User } from 'src/users/users/entities/user.entity'
import { CompaniesService } from '../companies/companies.service'
import { extractPrismaErrors } from 'src/utils/extract-prisma-errors'

const companyLogoIncludes = {
  company: true,
  creator: true,
  updater: true
}

@Injectable()
export class CompanyLogosService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly companiesService : CompaniesService
  ) {}

  async create ( createCompanyLogoInput: CreateCompanyLogoInput, creator : User ) : Promise<CompanyLogo> {
    const { companyId } = createCompanyLogoInput
    await this.companiesService.findOne( companyId )
    try {
      const companyLogo = await this.prismaService.companyLogos.create({
        data: {
          ...createCompanyLogoInput,
          createdBy: creator.id
        }
      })
      return companyLogo
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }

  }

  async findAll () {
    const companyLogos = await this.prismaService.companyLogos.findMany({
      include: { ...companyLogoIncludes }
    })

    return companyLogos
  }

  async findOne ( id : string ) {
    const companyLogo = await this.prismaService.companyLogos.findUnique({
      where: { id },
      include: { ...companyLogoIncludes }
    })

    if ( !companyLogo ) throw new NotFoundException( `Company logo with id ${ id } not found` )
    return companyLogo
  }

  async update ( id : string, updateCompanyLogoInput : UpdateCompanyLogoInput, updater : User ) : Promise<CompanyLogo> {
    await this.findOne( id )
    const { companyId } = updateCompanyLogoInput
    if ( companyId ) await this.companiesService.findOne( companyId )
    try {
      const companyLogo = await this.prismaService.companyLogos.update({
        where: { id },
        data: {
          ...updateCompanyLogoInput,
          updatedBy: updater.id
        }
      })
      return companyLogo
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) : Promise<CompanyLogo> {
    await this.findOne( id )
    try {
      const companyLogo = await this.prismaService.companyLogos.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id
        }
      })
      return companyLogo
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    const prismaError = extractPrismaErrors( error )
    if ( prismaError ) throw new BadRequestException( prismaError )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
