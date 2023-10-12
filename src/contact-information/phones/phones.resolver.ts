import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { PhonesService } from './phones.service'
import { Phone } from './entities/phone.entity'
import { CreatePhoneInput, UpdatePhoneInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'

@UseGuards( JwtAuthGuard )
@Resolver( () => Phone )
export class PhonesResolver {

  constructor(
    private readonly phonesService: PhonesService
  ) {}

  @Mutation( () => Phone )
  async createPhone(
    @Args( 'createPhoneInput' ) createPhoneInput : CreatePhoneInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<Phone> {
    return await this.phonesService.create( createPhoneInput, user )
  }

  @Query( () => [ Phone ], { name: 'phones' } )
  async findAll (
    @CurrentUser([ ValidRoles.ADMIN ]) _user : User
  ) {
    return await this.phonesService.findAll()
  }

  @Query( () => Phone, { name: 'phone' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return await this.phonesService.findOne( id )
  }

  @Mutation( () => Phone )
  async updatePhone (
    @Args( 'updatePhoneInput' ) updatePhoneInput : UpdatePhoneInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<Phone> {
    return await this.phonesService.update( updatePhoneInput.id, updatePhoneInput, user )
  }

  @Mutation( () => Phone )
  async removePhone(
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<Phone> {
    return this.phonesService.deactivate( id, user )
  }
}
