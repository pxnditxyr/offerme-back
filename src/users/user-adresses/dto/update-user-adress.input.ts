import { CreateUserAdressInput } from './create-user-adress.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserAdressInput extends PartialType(CreateUserAdressInput) {
  @Field(() => Int)
  id: number;
}
