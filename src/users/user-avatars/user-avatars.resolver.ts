import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserAvatarsService } from './user-avatars.service';
import { UserAvatar } from './entities/user-avatar.entity';
import { CreateUserAvatarInput } from './dto/create-user-avatar.input';
import { UpdateUserAvatarInput } from './dto/update-user-avatar.input';

@Resolver(() => UserAvatar)
export class UserAvatarsResolver {
  constructor(private readonly userAvatarsService: UserAvatarsService) {}

  @Mutation(() => UserAvatar)
  createUserAvatar(@Args('createUserAvatarInput') createUserAvatarInput: CreateUserAvatarInput) {
    return this.userAvatarsService.create(createUserAvatarInput);
  }

  @Query(() => [UserAvatar], { name: 'userAvatars' })
  findAll() {
    return this.userAvatarsService.findAll();
  }

  @Query(() => UserAvatar, { name: 'userAvatar' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userAvatarsService.findOne(id);
  }

  @Mutation(() => UserAvatar)
  updateUserAvatar(@Args('updateUserAvatarInput') updateUserAvatarInput: UpdateUserAvatarInput) {
    return this.userAvatarsService.update(updateUserAvatarInput.id, updateUserAvatarInput);
  }

  @Mutation(() => UserAvatar)
  removeUserAvatar(@Args('id', { type: () => Int }) id: number) {
    return this.userAvatarsService.remove(id);
  }
}
