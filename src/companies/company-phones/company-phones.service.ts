import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common'
import { CreateCompanyPhoneInput, UpdateCompanyPhoneInput } from './dto/inputs'
import { User } from 'src/users/users/entities/user.entity'
import { CompanyPhone } from './entities/company-phone.entity'
import { PrismaService } from 'src/prisma'
import { CompaniesService } from '../companies/companies.service'
import { PhonesService } from 'src/contact-information/phones/phones.service'
import { extractPrismaExceptions } from 'src/common/exception-catchers'

const companyPhoneIncludes = {
  company: true,
  phone: true,
  creator: true,
  updater: true
}

@Injectable()
export class CompanyPhonesService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly companiesService : CompaniesService,
    private readonly phonesService : PhonesService,
  ) {}

  async create ( createCompanyPhoneInput  : CreateCompanyPhoneInput, creator : User ) : Promise<CompanyPhone> {
    const { phoneId, companyId } = createCompanyPhoneInput
    await this.companiesService.findOne( companyId )
    await this.phonesService.findOne( phoneId )
    try {
      const companyPhone = await this.prismaService.companyPhones.create({
        data: {
          ...createCompanyPhoneInput,
          createdBy: creator.id
        }
      })
      return companyPhone
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () {
    const companyPhones = await this.prismaService.companyPhones.findMany({
      include: { ...companyPhoneIncludes }
    })
    return companyPhones
  }

  async findOne ( id : string ) {
    const companyPhone = await this.prismaService.companyPhones.findUnique({
      where: { id },
      include: { ...companyPhoneIncludes }
    })
    if ( !companyPhone ) throw new BadRequestException( `The companyPhone with id: ${ id } does not exists` )
    return companyPhone
  }

  async update ( id : string, updateCompanyPhoneInput : UpdateCompanyPhoneInput, updater : User ) : Promise<CompanyPhone> {
    await this.findOne( id )
    const { phoneId, companyId } = updateCompanyPhoneInput
    if ( phoneId ) await this.phonesService.findOne( phoneId )
    if ( companyId ) await this.companiesService.findOne( companyId )
    try {
      const companyPhone = await this.prismaService.companyPhones.update({
        where: { id },
        data: {
          ...updateCompanyPhoneInput,
          updatedBy: updater.id
        }
      })
      return companyPhone
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) : Promise<CompanyPhone> {
    await this.findOne( id )
    try {
      const companyPhone = await this.prismaService.companyPhones.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id
        }
      })
      return companyPhone
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    const prismaError = extractPrismaExceptions( error )
    if ( prismaError ) throw new BadRequestException( prismaError )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
