import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreatePeopleInfoInput } from './create-people-info.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdatePeopleInfoInput extends PartialType( CreatePeopleInfoInput ) {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean

  @Field( () => ID, { nullable: true, description: 'PeopleInfo updater' } )
  @IsOptional()
  @IsUUID()
  updatedBy?: string
}
