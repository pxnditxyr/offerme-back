import { CreateCreditCardInput } from './create-credit-card.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCreditCardInput extends PartialType(CreateCreditCardInput) {
  @Field(() => Int)
  id: number;
}
