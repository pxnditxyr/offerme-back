import { Args, ID, Query, Resolver } from '@nestjs/graphql'
import { Session } from './entities/session.entity'
import { SessionsService } from './sessions.service'
import { ParseUUIDPipe } from '@nestjs/common'

@Resolver( () => Session )
export class SessionsResolver {

  constructor (
    private readonly sessionsService : SessionsService
  ) {}
  
  @Query( () => [ Session ], { name: 'sessions' } )
  async findAll () {
    return await this.sessionsService.findAll()
  }

  @Query( () => Session, { name: 'session' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id: string
  ) {
    return await this.sessionsService.findOne( id )
  }
}
