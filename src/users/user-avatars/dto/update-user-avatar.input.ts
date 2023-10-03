import { CreateUserAvatarInput } from './create-user-avatar.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserAvatarInput extends PartialType(CreateUserAvatarInput) {
  @Field(() => Int)
  id: number;
}
