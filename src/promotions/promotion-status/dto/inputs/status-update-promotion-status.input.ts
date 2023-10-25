import { IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { InputType, Field, Int } from '@nestjs/graphql'

@InputType()
export class StatusUpdatePromotionStatusInput {
  @Field( () => Int )
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
