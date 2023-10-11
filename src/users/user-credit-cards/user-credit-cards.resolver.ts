import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserCreditCardsService } from './user-credit-cards.service';
import { UserCreditCard } from './entities/user-credit-card.entity';
import { CreateUserCreditCardInput } from './dto/create-user-credit-card.input';
import { UpdateUserCreditCardInput } from './dto/update-user-credit-card.input';

@Resolver(() => UserCreditCard)
export class UserCreditCardsResolver {
  constructor(private readonly userCreditCardsService: UserCreditCardsService) {}

  @Mutation(() => UserCreditCard)
  createUserCreditCard(@Args('createUserCreditCardInput') createUserCreditCardInput: CreateUserCreditCardInput) {
    return this.userCreditCardsService.create(createUserCreditCardInput);
  }

  @Query(() => [UserCreditCard], { name: 'userCreditCards' })
  findAll() {
    return this.userCreditCardsService.findAll();
  }

  @Query(() => UserCreditCard, { name: 'userCreditCard' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userCreditCardsService.findOne(id);
  }

  @Mutation(() => UserCreditCard)
  updateUserCreditCard(@Args('updateUserCreditCardInput') updateUserCreditCardInput: UpdateUserCreditCardInput) {
    return this.userCreditCardsService.update(updateUserCreditCardInput.id, updateUserCreditCardInput);
  }

  @Mutation(() => UserCreditCard)
  removeUserCreditCard(@Args('id', { type: () => Int }) id: number) {
    return this.userCreditCardsService.remove(id);
  }
}
