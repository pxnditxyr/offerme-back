import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreditCardsService } from './credit-cards.service';
import { CreditCard } from './entities/credit-card.entity';
import { CreateCreditCardInput } from './dto/create-credit-card.input';
import { UpdateCreditCardInput } from './dto/update-credit-card.input';

@Resolver(() => CreditCard)
export class CreditCardsResolver {
  constructor(private readonly creditCardsService: CreditCardsService) {}

  @Mutation(() => CreditCard)
  createCreditCard(@Args('createCreditCardInput') createCreditCardInput: CreateCreditCardInput) {
    return this.creditCardsService.create(createCreditCardInput);
  }

  @Query(() => [CreditCard], { name: 'creditCards' })
  findAll() {
    return this.creditCardsService.findAll();
  }

  @Query(() => CreditCard, { name: 'creditCard' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.creditCardsService.findOne(id);
  }

  @Mutation(() => CreditCard)
  updateCreditCard(@Args('updateCreditCardInput') updateCreditCardInput: UpdateCreditCardInput) {
    return this.creditCardsService.update(updateCreditCardInput.id, updateCreditCardInput);
  }

  @Mutation(() => CreditCard)
  removeCreditCard(@Args('id', { type: () => Int }) id: number) {
    return this.creditCardsService.remove(id);
  }
}
