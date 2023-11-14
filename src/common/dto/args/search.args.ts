import { ArgsType, Field } from '@nestjs/graphql'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

@ArgsType()
export class SearchArgs {
  @Field( () => String, { nullable: true } )
  @IsOptional()
  @IsString()
  search?: string = ''

  @Field( () => Boolean, { nullable: true } )
  @IsOptional()
  @IsBoolean()
  status?: boolean | null = null
}
