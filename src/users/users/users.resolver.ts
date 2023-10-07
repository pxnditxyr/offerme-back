import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { CreateUserInput, UpdateUserInput } from './dto/inputs'

@Resolver( () => User )
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Mutation( () => User )
  async createUser (
    @Args( 'createUserInput' ) createUserInput : CreateUserInput
  ) : Promise<User> {
    return await this.usersService.create(createUserInput)
  }

  @Query( () => [ User ], { name: 'users' } )
  async findAll () {
    return await this.usersService.findAll()
  }

  @Query( () => User, { name: 'user' } )
  async findOne (
    @Args( 'id', { type: () => ID } ) id : string
  ) {
    return await this.usersService.findOne( id )
  }

  @Mutation( () => User )
  async updateUser (
    @Args( 'updateUserInput' ) updateUserInput : UpdateUserInput
  ) {
    return await this.usersService.update( updateUserInput.id, updateUserInput )
  }

  @Mutation( () => User )
  async deactivateUser (
    @Args('id', { type: () => ID } ) id : string
  ) {
    return await this.usersService.deactivate( id )
  }
}
