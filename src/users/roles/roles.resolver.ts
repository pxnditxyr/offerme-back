import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { RolesService } from './roles.service'
import { Role } from './entities/role.entity'
import { CreateRoleInput, UpdateRoleInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from '../users/entities/user.entity'

@UseGuards( JwtAuthGuard )
@Resolver( () => Role )
export class RolesResolver {
  constructor(
    private readonly rolesService: RolesService
  ) {}

  @Mutation( () => Role )
  async createRole(
    @Args( 'createRoleInput' ) createRoleInput : CreateRoleInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<Role> {
    return await this.rolesService.create( createRoleInput, user )
  }

  @Query( () => [ Role ], { name: 'roles' } )
  async findAll (
    @CurrentUser([ ValidRoles.ADMIN ]) _user : User
  ) {
    return await this.rolesService.findAll()
  }

  @Query( () => Role, { name: 'role' } )
  async findOne(
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) _user : User
  ) {
    return await this.rolesService.findOne( id )
  }

  @Mutation( () => Role )
  async updateRole (
    @Args( 'updateRoleInput' ) updateRoleInput : UpdateRoleInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<Role> {
    return this.rolesService.update( updateRoleInput.id, updateRoleInput, user )
  }

  @Mutation( () => Role )
  deactivateRole (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<Role> {
    return this.rolesService.deactivate( id, user )
  }
}
