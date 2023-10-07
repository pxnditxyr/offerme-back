import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { RolesService } from './roles.service'
import { Role } from './entities/role.entity'
import { CreateRoleInput, UpdateRoleInput } from './dto/inputs'

@Resolver( () => Role )
export class RolesResolver {
  constructor(
    private readonly rolesService: RolesService
  ) {}

  @Mutation( () => Role )
  async createRole(
    @Args( 'createRoleInput' ) createRoleInput : CreateRoleInput
  ) : Promise<Role> {
    return await this.rolesService.create( createRoleInput )
  }

  @Query( () => [ Role ], { name: 'roles' } )
  async findAll() {
    return await this.rolesService.findAll()
  }

  @Query( () => Role, { name: 'role' } )
  async findOne(
    @Args( 'id', { type: () => ID } ) id : string
  ) {
    return await this.rolesService.findOne( id )
  }

  @Mutation( () => Role )
  async updateRole (
    @Args( 'updateRoleInput' ) updateRoleInput : UpdateRoleInput
  ) : Promise<Role> {
    return this.rolesService.update( updateRoleInput.id, updateRoleInput )
  }

  @Mutation( () => Role )
  deactivateRole (
    @Args( 'id', { type: () => ID } ) id : string
  ) : Promise<Role> {
    return this.rolesService.deactivate( id )
  }
}
