import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateUserInput, UpdateUserInput } from './dto/inputs'
import { User } from './entities/user.entity'
import { PrismaService } from '../../prisma'
import { RolesService } from '../roles/roles.service'

@Injectable()
export class UsersService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly rolesService : RolesService
  ) {}

  async create ( createUserInput : CreateUserInput ) : Promise<User> {
    const { roleId } = createUserInput
    await this.rolesService.findOne( roleId )
    try {
      const user = await this.prismaService.users.create({
        data: { ...createUserInput }
      })
      return user
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () {
    const users = await this.prismaService.users.findMany({
      include: {
        peopleInfo: true,
        role: true,
        creator: true,
        updater: true,
        sessions: true,
        avatars: true,
      }
    })
    return users
  }

  async findOne ( id : string ) {
    const user = await this.prismaService.users.findUnique({
      where: { id },
      include: {
        peopleInfo: true,
        role: true,
        creator: true,
        updater: true,
        sessions: true,
        avatars: true,
      }
    })
    if ( !user ) throw new NotFoundException( `User ${ id } not found` )
    return user
  }

  async findByEmail ( email : string ) {
    const user = await this.prismaService.users.findUnique({
      where: { email },
      include: {
        peopleInfo: true,
        role: true,
        creator: true,
        updater: true,
        sessions: true,
        avatars: true,
      }
    })
    if ( !user ) throw new NotFoundException( `User ${ email } not found` )
    return user
  }

  async update ( id : string, updateUserInput : UpdateUserInput ) : Promise<User> {
    await this.findOne( id )
    const { roleId } = updateUserInput
    if( roleId ) await this.rolesService.findOne( roleId )
    try {
      const user = await this.prismaService.users.update({
        where: { id },
        data: { ...updateUserInput }
      })
      return user
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string ) : Promise<User> {
    await this.findOne( id )
    try {
      const user = await this.prismaService.users.update({
        where: { id },
        data: { status: false }
      })
      return user
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    if ( error.code === 'P2002' ) {
      throw new BadRequestException(
        error.meta.target.map( ( field : string ) =>
          `The ${ field } is already in use` ).join( ', ' )
      )
    }
    console.error( error )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
