import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { UserAvatarsService } from './user-avatars.service'
import { UserAvatar } from './entities/user-avatar.entity'
import { CreateUserAvatarInput, UpdateUserAvatarInput } from './dto/inputs'

@Resolver( () => UserAvatar )
export class UserAvatarsResolver {
  constructor(
    private readonly userAvatarsService: UserAvatarsService
  ) {}

  @Mutation( () => UserAvatar )
  async createUserAvatar(
    @Args( 'createUserAvatarInput' ) createUserAvatarInput : CreateUserAvatarInput
  ) : Promise<UserAvatar> {
    return await this.userAvatarsService.create( createUserAvatarInput )
  }

  @Query( () => [ UserAvatar ], { name: 'userAvatars' } )
  async findAll () {
    return await this.userAvatarsService.findAll()
  }

  @Query( () => UserAvatar, { name: 'userAvatar' } )
  async findOne(
    @Args( 'id', { type: () => ID } ) id : string
  ) {
    return await this.userAvatarsService.findOne( id )
  }

  @Mutation( () => UserAvatar )
  async updateUserAvatar(
    @Args('updateUserAvatarInput') updateUserAvatarInput: UpdateUserAvatarInput
  ) : Promise<UserAvatar> {
    return await this.userAvatarsService.update( updateUserAvatarInput.id, updateUserAvatarInput )
  }

  @Mutation( () => UserAvatar )
  async deactivateUserAvatar(
    @Args( 'id', { type: () => ID } ) id : string
  ) {
    return await this.userAvatarsService.deactivate( id )
  }
}
