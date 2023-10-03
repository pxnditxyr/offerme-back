import { Injectable } from '@nestjs/common';
import { CreateUserAvatarInput } from './dto/create-user-avatar.input';
import { UpdateUserAvatarInput } from './dto/update-user-avatar.input';

@Injectable()
export class UserAvatarsService {
  create(createUserAvatarInput: CreateUserAvatarInput) {
    return 'This action adds a new userAvatar';
  }

  findAll() {
    return `This action returns all userAvatars`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAvatar`;
  }

  update(id: number, updateUserAvatarInput: UpdateUserAvatarInput) {
    return `This action updates a #${id} userAvatar`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAvatar`;
  }
}
