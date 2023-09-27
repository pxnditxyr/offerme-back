import { CreateParametricInput } from './create-parametric.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateParametricInput extends PartialType(CreateParametricInput) {
  @Field( () => String )
  id: string
}
