import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserAdressesService } from './user-adresses.service';
import { UserAdress } from './entities/user-adress.entity';
import { CreateUserAdressInput } from './dto/create-user-adress.input';
import { UpdateUserAdressInput } from './dto/update-user-adress.input';

@Resolver(() => UserAdress)
export class UserAdressesResolver {
  constructor(private readonly userAdressesService: UserAdressesService) {}

  @Mutation(() => UserAdress)
  createUserAdress(@Args('createUserAdressInput') createUserAdressInput: CreateUserAdressInput) {
    return this.userAdressesService.create(createUserAdressInput);
  }

  @Query(() => [UserAdress], { name: 'userAdresses' })
  findAll() {
    return this.userAdressesService.findAll();
  }

  @Query(() => UserAdress, { name: 'userAdress' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userAdressesService.findOne(id);
  }

  @Mutation(() => UserAdress)
  updateUserAdress(@Args('updateUserAdressInput') updateUserAdressInput: UpdateUserAdressInput) {
    return this.userAdressesService.update(updateUserAdressInput.id, updateUserAdressInput);
  }

  @Mutation(() => UserAdress)
  removeUserAdress(@Args('id', { type: () => Int }) id: number) {
    return this.userAdressesService.remove(id);
  }
}
