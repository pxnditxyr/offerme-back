import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateSessionInput } from './dto/inputs'
import { Session } from './entities/session.entity'
import { PrismaService } from '../../prisma'

@Injectable()
export class SessionsService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService
  ) {}


  async create( createSessionInput : CreateSessionInput ) : Promise<Session> {
    try {
      const session = await this.prismaService.sessions.create({
        data: { ...createSessionInput }
      })
      return session
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () {
    const sessions = await this.prismaService.sessions.findMany({
      include: {
        creator: true,
        updater: true,
        user: true,
      }
    })
    return sessions
  }

  async findOne ( id : string ) {
    const session = await this.prismaService.sessions.findUnique({
      where: { id },
      include: {
        creator: true,
        updater: true,
        user: true,
      }
    })
    if ( !session ) throw new NotFoundException( `Session ${ id } not found` )
    return session
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
