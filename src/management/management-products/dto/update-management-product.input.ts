import { CreateManagementProductInput } from './create-management-product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateManagementProductInput extends PartialType(CreateManagementProductInput) {
  @Field(() => Int)
  id: number;
}
