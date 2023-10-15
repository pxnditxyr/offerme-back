import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { CompanyAddressesService } from './company-addresses.service'
import { CompanyAddress } from './entities/company-address.entity'
import { CreateCompanyAddressInput, UpdateCompanyAddressInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'

@UseGuards( JwtAuthGuard )
@Resolver( () => CompanyAddress )
export class CompanyAddressesResolver {
  constructor(
    private readonly companyAddressesService: CompanyAddressesService
  ) {}

  @Mutation( () => CompanyAddress )
  async createCompanyAddress (
    @Args( 'createCompanyAddressInput' ) createCompanyAddressInput : CreateCompanyAddressInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) {
    return await this.companyAddressesService.create( createCompanyAddressInput, user )
  }

  @Query( () => [ CompanyAddress ], { name: 'companyAddresses' } )
  async findAll (
    @CurrentUser([ ValidRoles.ADMIN ]) _user : User
  ) {
    return await this.companyAddressesService.findAll()
  }

  @Query( () => CompanyAddress, { name: 'companyAddress' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return this.companyAddressesService.findOne( id )
  }

  @Mutation( () => CompanyAddress )
  async updateCompanyAddress (
    @Args( 'updateCompanyAddressInput' ) updateCompanyAddressInput : UpdateCompanyAddressInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) {
    return await this.companyAddressesService.update( updateCompanyAddressInput.id, updateCompanyAddressInput, user )
  }

  @Mutation( () => CompanyAddress )
  async deactivateCompanyAddress(
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) {
    return this.companyAddressesService.deactivate( id, user )
  }
}
