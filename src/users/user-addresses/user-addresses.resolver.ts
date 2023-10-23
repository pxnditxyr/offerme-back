import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { UserAddressesService } from './user-addresses.service'
import { UserAddress } from './entities/user-address.entity'
import { CreateUserAddressInput, UpdateUserAddressInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from '../users/entities/user.entity'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'

@UseGuards( JwtAuthGuard )
@Resolver( () => UserAddress )
export class UserAddressesResolver {
  constructor (
    private readonly userAddressesService : UserAddressesService,
  ) {}

  @Mutation( () => UserAddress )
  async createUserAddress (
    @Args( 'createUserAddressInput' ) createUserAddressInput : CreateUserAddressInput,
    @CurrentUser([ ValidRoles.USER, ValidRoles.ADMIN ]) creator : User
  ) {
    return await this.userAddressesService.create( createUserAddressInput, creator )
  }

  @Query( () => [ UserAddress ], { name: 'userAddresses' } )
  async findAll (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs
  ) {
    return await this.userAddressesService.findAll({ paginationArgs, searchArgs })
  }

  @Query( () => UserAddress, { name: 'userAddress' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return await this.userAddressesService.findOne( id )
  }

  @Mutation( () => UserAddress )
  async updateUserAddress (
    @Args( 'updateUserAddressInput' ) updateUserAddressInput : UpdateUserAddressInput,
    @CurrentUser([ ValidRoles.USER, ValidRoles.ADMIN ]) updater : User
  ) {
    return await this.userAddressesService.update( updateUserAddressInput.id, updateUserAddressInput, updater )
  }

  @Mutation( () => UserAddress )
  async deactivateUserAddress (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.USER, ValidRoles.ADMIN ]) updater : User
  ) {
    return await this.userAddressesService.deactivate( id, updater )
  }
}
