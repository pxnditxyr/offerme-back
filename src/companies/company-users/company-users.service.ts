import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateCompanyUserInput, UpdateCompanyUserInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { CompaniesService } from '../companies/companies.service'
import { UsersService } from 'src/users/users/users.service'
import { User } from 'src/users/users/entities/user.entity'
import { CompanyUser } from './entities/company-user.entity'
import { extractPrismaExceptions } from 'src/common/exception-catchers'
import { Company } from '../companies/entities/company.entity'

const companyUserIncludes = {
  user: true,
  company: true,
  creator: true,
  updater: true
}

@Injectable()
export class CompanyUsersService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly companiesService : CompaniesService,
    private readonly usersService : UsersService,
  ) {}

  async create ( createCompanyUserInput : CreateCompanyUserInput, creator : User ) : Promise<CompanyUser> {
    const { companyId, userId } = createCompanyUserInput
    await this.companiesService.findOne( companyId )
    await this.usersService.findOne( userId )
    try {
      const companyUser = await this.prismaService.companyUsers.create({
        data: {
          ...createCompanyUserInput,
          createdBy: creator.id
        }
      })
      return companyUser
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () {
    const companyUsers = await this.prismaService.companyUsers.findMany({
      include: { ...companyUserIncludes }
    })
    return companyUsers
  }

  async findOne ( id : string ) {
    const companyUser = await this.prismaService.companyUsers.findUnique({
      where: { id },
      include: { ...companyUserIncludes }
    })
    if ( !companyUser ) throw new NotFoundException( `Company User with ID ${ id } not found` )
    return companyUser
  }

  async update ( id : string, updateCompanyUserInput : UpdateCompanyUserInput, updater : User ) : Promise<CompanyUser> {
    await this.findOne( id )
    const { companyId, userId } = updateCompanyUserInput
    if ( companyId ) await this.companiesService.findOne( companyId )
    if ( userId ) await this.usersService.findOne( userId )
    try {
      const companyUser = await this.prismaService.companyUsers.update({
        where: { id },
        data: {
          ...updateCompanyUserInput,
          updatedBy: updater.id
        }
      })
      return companyUser
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string, updater : User ) : Promise<CompanyUser> {
    const currentCompanyUser = await this.findOne( id )
    try {
      const companyUser = await this.prismaService.companyUsers.update({
        where: { id },
        data: {
          status: !currentCompanyUser.status,
          updatedBy: updater.id
        }
      })
      return companyUser
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async getCompanyByUserId ( userId : string ) : Promise<Company> {
    await this.usersService.findOne( userId )

    const companyUser = await this.prismaService.companyUsers.findFirst({
      where: { userId },
    })

    if ( !companyUser ) throw new NotFoundException( `Company User with User ID ${ userId } not found` )

    const company = await this.companiesService.findOne( companyUser.companyId )
    if ( !company ) throw new NotFoundException( `Company with ID ${ companyUser.companyId } not found` )
    return company
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    const prismaError = extractPrismaExceptions( error )
    if ( prismaError ) throw new BadRequestException( prismaError )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
