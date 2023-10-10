import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { UserAvatarsService } from './user-avatars.service'
import { UserAvatar } from './entities/user-avatar.entity'
import { CreateUserAvatarInput, UpdateUserAvatarInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from '../users/entities/user.entity'

@Resolver( () => UserAvatar )
export class UserAvatarsResolver {
  constructor(
    private readonly userAvatarsService: UserAvatarsService
  ) {}

  @Mutation( () => UserAvatar )
  @UseGuards( JwtAuthGuard )
  async createUserAvatar(
    @Args( 'createUserAvatarInput' ) createUserAvatarInput : CreateUserAvatarInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<UserAvatar> {
    return await this.userAvatarsService.create( createUserAvatarInput, user )
  }

  @Query( () => [ UserAvatar ], { name: 'userAvatars' } )
  async findAll () {
    return await this.userAvatarsService.findAll()
  }

  @Query( () => UserAvatar, { name: 'userAvatar' } )
  async findOne(
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return await this.userAvatarsService.findOne( id )
  }

  @Mutation( () => UserAvatar )
  @UseGuards( JwtAuthGuard )
  async updateUserAvatar(
    @Args( 'updateUserAvatarInput' ) updateUserAvatarInput: UpdateUserAvatarInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<UserAvatar> {
    return await this.userAvatarsService.update( updateUserAvatarInput.id, updateUserAvatarInput, user )
  }

  @Mutation( () => UserAvatar )
  @UseGuards( JwtAuthGuard )
  async deactivateUserAvatar(
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) {
    return await this.userAvatarsService.deactivate( id, user )
  }
}
