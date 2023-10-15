import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateCompanyCategoryInput, UpdateCompanyCategoryInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { CompanyCategory } from './entities/company-category.entity'
import { CompaniesService } from '../companies/companies.service'
import { CategoriesService } from 'src/categories/categories/categories.service'
import { User } from 'src/users/users/entities/user.entity'

const companyCategoryIncludes = {
  company: true,
  category: true,
  creator: true,
  updater: true,
}

@Injectable()
export class CompanyCategoriesService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly companiesService : CompaniesService,
    private readonly categoriesService : CategoriesService,
  ) {}

  async create ( createCompanyCategoryInput: CreateCompanyCategoryInput, creator : User ) : Promise<CompanyCategory> {
    const { companyId, categoryId } = createCompanyCategoryInput
    await this.companiesService.findOne( companyId )
    await this.categoriesService.findOne( categoryId )
    try {
      const companyCategory = await this.prismaService.companyCategories.create({
        data: {
          ...createCompanyCategoryInput,
          createdBy: creator.id,
        }
      })
      return companyCategory
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () {
    const companyCategories = await this.prismaService.companyCategories.findMany({
      include: { ...companyCategoryIncludes }
    })
    return companyCategories
  }

  async findOne ( id : string ) {
    const companyCategory = await this.prismaService.companyCategories.findUnique({
      where: { id },
      include: { ...companyCategoryIncludes }
    })

    if ( !companyCategory ) throw new NotFoundException( `CompanyCategory with ID ${ id } not found` )

    return companyCategory
  }

  async update ( id : string, updateCompanyCategoryInput : UpdateCompanyCategoryInput, updater : User ) : Promise<CompanyCategory> {
    const { companyId, categoryId } = updateCompanyCategoryInput
    if ( companyId ) await this.companiesService.findOne( companyId )
    if ( categoryId ) await this.categoriesService.findOne( categoryId )

    try {
      const companyCategory = await this.prismaService.companyCategories.update({
        where: { id },
        data: {
          ...updateCompanyCategoryInput,
          updatedBy: updater.id,
        },
        include: { ...companyCategoryIncludes }
      })
      return companyCategory
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) : Promise<CompanyCategory> {
    try {
      const companyCategory = await this.prismaService.companyCategories.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id,
        },
        include: { ...companyCategoryIncludes }
      })
      return companyCategory
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
