import { Args, ID, Query, Resolver } from '@nestjs/graphql'
import { Session } from './entities/session.entity'
import { SessionsService } from './sessions.service'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from '../users/entities/user.entity'

@UseGuards( JwtAuthGuard )
@Resolver( () => Session )
export class SessionsResolver {

  constructor (
    private readonly sessionsService : SessionsService
  ) {}
  
  @Query( () => [ Session ], { name: 'sessions' } )
  async findAll (
    @CurrentUser([ ValidRoles.ADMIN ]) _user : User
  ) {
    return await this.sessionsService.findAll()
  }

  @Query( () => Session, { name: 'session' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id: string,
    @CurrentUser([ ValidRoles.ADMIN ]) _user : User
  ) {
    return await this.sessionsService.findOne( id )
  }
}
