import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserPhonesService } from './user-phones.service';
import { UserPhone } from './entities/user-phone.entity';
import { CreateUserPhoneInput } from './dto/create-user-phone.input';
import { UpdateUserPhoneInput } from './dto/update-user-phone.input';

@Resolver(() => UserPhone)
export class UserPhonesResolver {
  constructor(private readonly userPhonesService: UserPhonesService) {}

  @Mutation(() => UserPhone)
  createUserPhone(@Args('createUserPhoneInput') createUserPhoneInput: CreateUserPhoneInput) {
    return this.userPhonesService.create(createUserPhoneInput);
  }

  @Query(() => [UserPhone], { name: 'userPhones' })
  findAll() {
    return this.userPhonesService.findAll();
  }

  @Query(() => UserPhone, { name: 'userPhone' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userPhonesService.findOne(id);
  }

  @Mutation(() => UserPhone)
  updateUserPhone(@Args('updateUserPhoneInput') updateUserPhoneInput: UpdateUserPhoneInput) {
    return this.userPhonesService.update(updateUserPhoneInput.id, updateUserPhoneInput);
  }

  @Mutation(() => UserPhone)
  removeUserPhone(@Args('id', { type: () => Int }) id: number) {
    return this.userPhonesService.remove(id);
  }
}
