import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { CreateUserInput, UpdateUserInput } from './dto/inputs'
import { ValidRolesArgs } from './dto/args'
import { CurrentUser } from '../../auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@UseGuards( JwtAuthGuard )
@Resolver( () => User )
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Mutation( () => User )
  async createUser (
    @Args( 'createUserInput' ) createUserInput : CreateUserInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<User> {
    return await this.usersService.create( createUserInput, user )
  }

  @Query( () => [ User ], { name: 'users' } )
  async findAll (
    @Args() validRoles : ValidRolesArgs,
    @CurrentUser([ ValidRoles.ADMIN ]) _user : User
  ) {
    console.log( validRoles )
    return await this.usersService.findAll( validRoles.roles )
  }

  @Query( () => User, { name: 'user' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) _user : User
  ) {
    return await this.usersService.findOne( id )
  }

  @Mutation( () => User )
  async updateUser (
    @Args( 'updateUserInput' ) updateUserInput : UpdateUserInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) {
    return await this.usersService.update( updateUserInput.id, updateUserInput, user )
  }

  @Mutation( () => User )
  async deactivateUser (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) {
    return await this.usersService.deactivate( id, user )
  }
}
