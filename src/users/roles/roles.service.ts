import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateRoleInput, UpdateRoleInput } from './dto/inputs'
import { PrismaService } from '../../prisma'
import { Role } from './entities/role.entity'

@Injectable()
export class RolesService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService
  ) {}

  async create( createRoleInput : CreateRoleInput ) : Promise<Role> {
    try {
      const role = await this.prismaService.roles.create({
        data: { ...createRoleInput }
      })
      return role
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () {
    const roles = await this.prismaService.roles.findMany({
      include: {
        creator: true,
        updater: true,
        users: true,
      }
    })
    return roles
  }

  async findOne ( id : string ) {
    const role = await this.prismaService.roles.findUnique({
      where: { id },
      include: {
        creator: true,
        updater: true,
        users: true,
      }
    })
    if ( !role ) throw new NotFoundException( `Role with id ${ id } not found` )
    return role
  }

  async update ( id : string, updateRoleInput: UpdateRoleInput ) : Promise<Role> {
    await this.findOne( id )
    try {
      const role = await this.prismaService.roles.update({
        where: { id },
        data: {
          ...updateRoleInput,
        }
      })
      return role
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string ) : Promise<Role> {
    await this.findOne( id )
    try {
      const role = await this.prismaService.roles.update({
        where: { id },
        data: {
          status: false,
        }
      })
      return role
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
