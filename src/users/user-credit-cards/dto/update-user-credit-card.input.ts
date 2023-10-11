import { CreateUserCreditCardInput } from './create-user-credit-card.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserCreditCardInput extends PartialType(CreateUserCreditCardInput) {
  @Field(() => Int)
  id: number;
}
