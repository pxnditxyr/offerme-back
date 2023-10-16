import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql'
import { CompanyPhonesService } from './company-phones.service'
import { CompanyPhone } from './entities/company-phone.entity'
import { CreateCompanyPhoneInput, UpdateCompanyPhoneInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'

@UseGuards( JwtAuthGuard )
@Resolver( () => CompanyPhone )
export class CompanyPhonesResolver {
  constructor (
    private readonly companyPhonesService: CompanyPhonesService
  ) {}

  @Mutation( () => CompanyPhone )
  async createCompanyPhone (
    @Args( 'createCompanyPhoneInput' ) createCompanyPhoneInput : CreateCompanyPhoneInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<CompanyPhone> {
    return await this.companyPhonesService.create( createCompanyPhoneInput, user )
  }

  @Query( () => [ CompanyPhone ], { name: 'companyPhones' } )
  async findAll (
    @CurrentUser([ ValidRoles.ADMIN ]) _user : User
  ) {
    return await this.companyPhonesService.findAll()
  }

  @Query( () => CompanyPhone, { name: 'companyPhone' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return await this.companyPhonesService.findOne( id )
  }

  @Mutation( () => CompanyPhone )
  async updateCompanyPhone (
    @Args( 'updateCompanyPhoneInput' ) updateCompanyPhoneInput : UpdateCompanyPhoneInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<CompanyPhone> {
    return await this.companyPhonesService.update( updateCompanyPhoneInput.id, updateCompanyPhoneInput, user )
  }

  @Mutation( () => CompanyPhone )
  async deactivateCompanyPhone(
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) {
    return await this.companyPhonesService.deactivate( id, user )
  }
}
