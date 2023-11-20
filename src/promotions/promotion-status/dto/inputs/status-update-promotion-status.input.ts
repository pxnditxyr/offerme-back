import { IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { InputType, Field, ID } from '@nestjs/graphql'

@InputType()
export class StatusUpdatePromotionStatusInput {
  @Field( () => ID )
  @IsUUID()
  id: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  adminComment: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  adminReason: string
}
