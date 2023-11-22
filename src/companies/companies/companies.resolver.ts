import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { CompaniesService } from './companies.service'
import { Company } from './entities/company.entity'
import { CreateCompanyInput, UpdateCompanyInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'

@UseGuards( JwtAuthGuard )
@Resolver( () => Company )
export class CompaniesResolver {
  constructor(
    private readonly companiesService : CompaniesService
  ) {}

  @Mutation( () => Company )
  async createCompany(
    @Args( 'createCompanyInput' ) createCompanyInput : CreateCompanyInput,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) user : User
  ) : Promise<Company> {
    return await this.companiesService.create( createCompanyInput, user )
  }

  @Query( () => [ Company ], { name: 'companies' } )
  async findAll(
    @CurrentUser([ ValidRoles.ADMIN ]) _user : User,
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs
  ) {
    return await this.companiesService.findAll({ paginationArgs, searchArgs })
  }

  @Query( () => Company, { name: 'company' } )
  async findOne(
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
  ) {
    return await this.companiesService.findOne( id )
  }

  @Mutation( () => Company )
  async updateCompany (
    @Args( 'updateCompanyInput' ) updateCompanyInput : UpdateCompanyInput,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) user : User
  ) : Promise<Company> {
    return await this.companiesService.update( updateCompanyInput.id, updateCompanyInput, user )
  }

  @Mutation( () => Company )
  async toggleStatusCompany (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) user : User
  ) {
    return this.companiesService.toggleStatus( id, user )
  }
}
