import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateCompanyAddressInput, UpdateCompanyAddressInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { User } from 'src/users/users/entities/user.entity'
import { CompanyAddress } from './entities/company-address.entity'
import { CompaniesService } from '../companies/companies.service'
import { AddressesService } from 'src/contact-information/addresses/addresses.service'

const companyAddressIncludes = {
  address: true,
  company: true,
  creator: true,
  updater: true
}

@Injectable()
export class CompanyAddressesService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,
    private readonly companiesService : CompaniesService,
    private readonly addressesService : AddressesService
  ) {}

  async create ( createCompanyAddressInput: CreateCompanyAddressInput, user : User ) : Promise<CompanyAddress> {
    const { addressId, companyId  } = createCompanyAddressInput
    await this.companiesService.findOne( companyId )
    await this.addressesService.findOne( addressId )
    try {
      const companyAddress = await this.prismaService.companyAddresses.create({
        data: {
          ...createCompanyAddressInput,
          createdBy: user.id,
        }
      })
      return companyAddress
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () {
    const companyAddresses = await this.prismaService.companyAddresses.findMany({
      include: { ...companyAddressIncludes }
    })
    return companyAddresses
  }

  async findOne ( id : string ) {
    const companyAddress = await this.prismaService.companyAddresses.findUnique({
      where: { id },
      include: { ...companyAddressIncludes }
    })
    if ( !companyAddress ) throw new NotFoundException( `Company Address with ID ${id} not found` )
    return companyAddress
  }

  async update ( id : string, updateCompanyAddressInput : UpdateCompanyAddressInput, user : User ) : Promise<CompanyAddress> {
    await this.findOne( id )
    const { addressId, companyId } = updateCompanyAddressInput
    if ( addressId ) await this.addressesService.findOne( addressId )
    if ( companyId ) await this.companiesService.findOne( companyId )
    try {
      const companyAddress = await this.prismaService.companyAddresses.update({
        where: { id },
        data: {
          ...updateCompanyAddressInput,
          updatedBy: user.id
        },
      })
      return companyAddress
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, user : User ) : Promise<CompanyAddress> {
    await this.findOne( id )
    try {
      const companyAddress = await this.prismaService.companyAddresses.update({
        where: { id },
        data: {
          status: false,
          updatedBy: user.id
        }
      })
      return companyAddress
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
