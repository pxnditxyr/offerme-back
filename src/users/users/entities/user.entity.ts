import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PeopleInfo } from '../../../users/people-info/entities/people-info.entity';
import { Role } from '../../../users/roles/entities/role.entity';
import { Session } from '../../sessions/entities/session.entity';
import { UserAvatar } from '../../../users/user-avatars/entities/user-avatar.entity';

@ObjectType()
export class User {
  @Field( () => ID )
  id: string
  
  @Field( () => ID )
  peopleInfoId: string

  @Field( () => ID )
  roleId: string

  @Field( () => String )
  email: string

  @Field( () => String )
  password: string

  @Field( () => Boolean )
  isVerifiedEmail: boolean

  @Field( () => String, { nullable: true } )
  googleId: string | null

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

  @Field( () => User, { nullable: true } )
  creator?: User | null

  @Field( () => User, { nullable: true } )
  updater?: User | null

  @Field( () => PeopleInfo, { nullable: true } )
  peopleInfo?: PeopleInfo

  @Field( () => Role, { nullable: true } )
  role?: Role

  @Field( () => [ Session ], { nullable: true } )
  sessions?: Session[]

  @Field( () => [ UserAvatar ], { nullable: true } )
  avatars?: UserAvatar[]
}
