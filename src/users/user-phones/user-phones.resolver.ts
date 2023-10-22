import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { UserPhonesService } from './user-phones.service'
import { UserPhone } from './entities/user-phone.entity'
import { CreateUserPhoneInput, UpdateUserPhoneInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from '../users/entities/user.entity'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@UseGuards( JwtAuthGuard )
@Resolver( () => UserPhone )
export class UserPhonesResolver {
  constructor (
    private readonly userPhonesService: UserPhonesService
  ) {}

  @Mutation( () => UserPhone )
  async createUserPhone(
    @Args( 'createUserPhoneInput' ) createUserPhoneInput : CreateUserPhoneInput,
    @CurrentUser([ ValidRoles.USER, ValidRoles.ADMIN ]) creator : User
  ) : Promise<UserPhone> {
    return await this.userPhonesService.create( createUserPhoneInput, creator )
  }

  @Query( () => [ UserPhone ], { name: 'userPhones' } )
  async findAll (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs
  ) {
    return await this.userPhonesService.findAll({ paginationArgs, searchArgs })
  }

  @Query( () => UserPhone, { name: 'userPhone' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return await this.userPhonesService.findOne( id )
  }

  @Mutation( () => UserPhone )
  async updateUserPhone (
    @Args( 'updateUserPhoneInput' ) updateUserPhoneInput : UpdateUserPhoneInput,
    @CurrentUser([ ValidRoles.USER, ValidRoles.ADMIN ]) updater : User
  ) : Promise<UserPhone> {
    return await this.userPhonesService.update( updateUserPhoneInput.id, updateUserPhoneInput, updater )
  }

  @Mutation( () => UserPhone )
  async deactivateUserPhone (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.USER, ValidRoles.ADMIN ]) updater : User
  ) : Promise<UserPhone> {
    return this.userPhonesService.deactivate( id, updater )
  }
}
