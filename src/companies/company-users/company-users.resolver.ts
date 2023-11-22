import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { CompanyUsersService } from './company-users.service'
import { CompanyUser } from './entities/company-user.entity'
import { CreateCompanyUserInput, UpdateCompanyUserInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'
import { Company } from '../companies/entities/company.entity'

@UseGuards( JwtAuthGuard )
@Resolver( () => CompanyUser )
export class CompanyUsersResolver {
  constructor(
    private readonly companyUsersService: CompanyUsersService
  ) {}

  @Mutation( () => CompanyUser )
  async createCompanyUser (
    @Args( 'createCompanyUserInput' ) createCompanyUserInput : CreateCompanyUserInput,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) user : User
  ) : Promise<CompanyUser> {
    return await this.companyUsersService.create( createCompanyUserInput, user )
  }

  @Query( () => [ CompanyUser ], { name: 'companyUsers' } )
  async findAll(
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) _user : User
  ) {
    return await this.companyUsersService.findAll()
  }

  @Query( () => CompanyUser, { name: 'companyUser' } )
  async findOne(
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,

  ) {
    return await this.companyUsersService.findOne( id )
  }

  @Mutation( () => CompanyUser )
  async updateCompanyUser(
    @Args( 'updateCompanyUserInput' ) updateCompanyUserInput : UpdateCompanyUserInput,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) user : User
  ) : Promise<CompanyUser> {
    return await this.companyUsersService.update( updateCompanyUserInput.id, updateCompanyUserInput, user )
  }

  @Mutation( () => CompanyUser )
  async toggleStatusCompanyUser(
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) user : User
  ) : Promise<CompanyUser> {
    return await this.companyUsersService.toggleStatus( id, user )
  }

  @Query( () => Company, { name: 'companyByUserId' } )
  async getCompanyByUserId (
    @Args( 'userId', { type: () => ID }, ParseUUIDPipe ) id : string,
  ) : Promise<Company> {
    return await this.companyUsersService.getCompanyByUserId( id )
  }
}
