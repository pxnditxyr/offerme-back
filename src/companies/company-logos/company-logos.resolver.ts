
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { CompanyLogosService } from './company-logos.service'
import { CompanyLogo } from './entities/company-logo.entity'
import { CreateCompanyLogoInput, UpdateCompanyLogoInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'

@UseGuards( JwtAuthGuard )
@Resolver( () => CompanyLogo )
export class CompanyLogosResolver {
  constructor (
    private readonly companyLogosService: CompanyLogosService
  ) {}

  @Mutation( () => CompanyLogo )
  async createCompanyLogo (
    @Args( 'createCompanyLogoInput' ) createCompanyLogoInput : CreateCompanyLogoInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<CompanyLogo> {
    return await this.companyLogosService.create( createCompanyLogoInput, user )
  }

  @Query( () => [ CompanyLogo ], { name: 'companyLogos' } )
  async findAll (
    @CurrentUser([ ValidRoles.ADMIN ]) _user : User
  ) {
    return await this.companyLogosService.findAll()
  }

  @Query( () => CompanyLogo, { name: 'companyLogo' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return this.companyLogosService.findOne( id )
  }

  @Mutation( () => CompanyLogo )
  async updateCompanyLogo (
    @Args( 'updateCompanyLogoInput' ) updateCompanyLogoInput : UpdateCompanyLogoInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<CompanyLogo> {
    return await this.companyLogosService.update( updateCompanyLogoInput.id, updateCompanyLogoInput, user )
  }

  @Mutation( () => CompanyLogo )
  async toggleStatusCompanyLogo (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<CompanyLogo> {
    return await this.companyLogosService.toggleStatus( id, user )
  }
}
