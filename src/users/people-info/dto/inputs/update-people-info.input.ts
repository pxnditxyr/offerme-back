import { IsOptional, IsUUID } from 'class-validator'
import { CreatePeopleInfoInput } from './create-people-info.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdatePeopleInfoInput extends PartialType( CreatePeopleInfoInput ) {
  @Field( () => ID )
  id: string

  //TODO: updatedBy should be required
  @Field( () => ID, { nullable: true, description: 'PeopleInfo updater' } )
  @IsOptional()
  @IsUUID()
  updatedBy?: string
}
