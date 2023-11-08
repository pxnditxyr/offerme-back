import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql'
import { ManagementUsersService } from './management-users.service'
import { ManagementUser } from './entities/management-user.entity'
import { CreateManagementUserInput, UpdateManagementUserInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'

@UseGuards( JwtAuthGuard )
@Resolver( () => ManagementUser )
export class ManagementUsersResolver {

  constructor (
    private readonly managementUsersService: ManagementUsersService
  ) {}

  @Mutation( () => ManagementUser )
  async createManagementUser (
    @Args( 'createManagementUserInput' ) createManagementUserInput : CreateManagementUserInput,
    @CurrentUser([ ValidRoles.ADMIN ]) creator : User
  ) : Promise<ManagementUser> {
    return this.managementUsersService.create( createManagementUserInput, creator )
  }

  @Query( () => [ ManagementUser ], { name: 'managementUsers' } )
  async findAll (
    @CurrentUser([ ValidRoles.ADMIN ]) _user : User,
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs
  ) : Promise<ManagementUser[]> {
    return this.managementUsersService.findAll({ paginationArgs, searchArgs })
  }

  @Query( () => ManagementUser, { name: 'managementUser' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) _user : User
  ) : Promise<ManagementUser> {
    return this.managementUsersService.findOne( id )
  }

  @Mutation( () => ManagementUser )
  async updateManagementUser (
    @Args( 'updateManagementUserInput' ) updateManagementUserInput : UpdateManagementUserInput,
    @CurrentUser([ ValidRoles.ADMIN ]) updater : User
  ) : Promise<ManagementUser> {
    return this.managementUsersService.update( updateManagementUserInput.id, updateManagementUserInput, updater )
  }

  @Mutation( () => ManagementUser )
  async deactivateManagementUser (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) updater : User
  ) {
    return this.managementUsersService.deactivate( id, updater )
  }
}
