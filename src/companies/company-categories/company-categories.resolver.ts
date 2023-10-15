import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { CompanyCategoriesService } from './company-categories.service'
import { CompanyCategory } from './entities/company-category.entity'
import { CreateCompanyCategoryInput, UpdateCompanyCategoryInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'

@UseGuards( JwtAuthGuard )
@Resolver( () => CompanyCategory )
export class CompanyCategoriesResolver {

  constructor(
    private readonly companyCategoriesService: CompanyCategoriesService
  ) {}

  @Mutation( () => CompanyCategory )
  async createCompanyCategory (
    @Args( 'createCompanyCategoryInput' ) createCompanyCategoryInput : CreateCompanyCategoryInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<CompanyCategory> {
    return await this.companyCategoriesService.create( createCompanyCategoryInput, user )
  }

  @Query( () => [ CompanyCategory ], { name: 'companyCategories' } )
  async findAll (
    @CurrentUser([ ValidRoles.ADMIN ]) _user : User
  ) {
    return await this.companyCategoriesService.findAll()
  }

  @Query( () => CompanyCategory, { name: 'companyCategory' } )
  async findOne(
    @Args('id', { type: () => ID },ParseUUIDPipe ) id : string
  ) {
    return await this.companyCategoriesService.findOne( id )
  }

  @Mutation( () => CompanyCategory )
  async updateCompanyCategory(
    @Args( 'updateCompanyCategoryInput' ) updateCompanyCategoryInput : UpdateCompanyCategoryInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<CompanyCategory> {
    return await this.companyCategoriesService.update( updateCompanyCategoryInput.id, updateCompanyCategoryInput, user )
  }

  @Mutation( () => CompanyCategory )
  async deactivateCompanyCategory (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<CompanyCategory> {
    return await this.companyCategoriesService.deactivate( id, user )
  }
}
