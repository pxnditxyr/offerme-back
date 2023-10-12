import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { AddressesService } from './addresses.service'
import { Address } from './entities/address.entity'
import { CreateAddressInput, UpdateAddressInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'

@UseGuards( JwtAuthGuard )
@Resolver( () => Address )
export class AddressesResolver {
  constructor(
    private readonly addressesService : AddressesService
  ) {}

  @Mutation( () => Address )
  async createAddress(
    @Args( 'createAddressInput' ) createAddressInput : CreateAddressInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) {
    return await this.addressesService.create( createAddressInput, user )
  }

  @Query( () => [Address], { name: 'addresses' } )
  async findAll (
    @CurrentUser([ ValidRoles.ADMIN ]) _user : User
  ) {
    return await this.addressesService.findAll()
  }

  @Query( () => Address, { name: 'address' } )
  async findOne(
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return await this.addressesService.findOne(id)
  }

  @Mutation( () => Address )
  async updateAddress(
    @Args( 'updateAddressInput' ) updateAddressInput: UpdateAddressInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<Address> {
    return await this.addressesService.update( updateAddressInput.id, updateAddressInput, user )
  }

  @Mutation(() => Address)
  async deactivateAddress (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<Address> {
    return this.addressesService.deactivate( id, user )
  }
}
