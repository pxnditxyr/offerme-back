import { CreateUserPhoneInput } from './create-user-phone.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserPhoneInput extends PartialType(CreateUserPhoneInput) {
  @Field(() => Int)
  id: number;
}
