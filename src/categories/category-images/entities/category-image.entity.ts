import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Category } from 'src/categories/categories/entities/category.entity'
import { User } from 'src/users/users/entities/user.entity'

@ObjectType()
export class CategoryImage {
  @Field( () => ID )
  id: string

  @Field( () => ID )
  categoryId: string

  @Field( () => String )
  url: string

  @Field( () => String, { description: 'Image description text' } )
  alt: string

  @Field( () => Boolean )
  isMain: boolean

  @Field( () => Boolean )
  status: boolean

  @Field( () => Date )
  createdAt: Date

  @Field( () => ID, { nullable: true } )
  createdBy?: string | null
 
  @Field( () => Date )
  updatedAt: Date

  @Field( () => ID, { nullable: true } )
  updatedBy?: string | null

  @Field( () => Category, { nullable: true } )
  category?: Category | null

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null
}
