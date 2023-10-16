import { InputType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class CreateCompanyPhoneInput {
  @Field( () => ID )
  @IsUUID()
  companyId: string

  @Field( () => ID )
  @IsUUID()
  phoneId: string
}
