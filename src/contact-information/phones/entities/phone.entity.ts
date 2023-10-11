import { ObjectType, Field, Int, ID } from '@nestjs/graphql'

@ObjectType()
export class Phone {
  @Field( () => ID )
  id: string
  
  @Field( () => ID )
  phoneTypeId: string

  @Field( () => String )
  number: string


}
