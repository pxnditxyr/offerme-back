import { CreatePeopleInfoInput } from './create-people-info.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePeopleInfoInput extends PartialType(CreatePeopleInfoInput) {
  @Field(() => Int)
  id: number;
}
