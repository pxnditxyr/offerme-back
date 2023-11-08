import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateUserInput, UpdateUserInput } from './dto/inputs'
import { User } from './entities/user.entity'
import { PrismaService } from '../../prisma'
import { RolesService } from '../roles/roles.service'
import { hashSync } from 'bcrypt'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { extractPrismaExceptions } from 'src/common/exception-catchers'
import { SubparametersService } from 'src/parametrics/subparameters/subparameters.service'

const userIncludes = {
  peopleInfo: true,
  role: true,
  creator: true,
  updater: true,
  sessions: true,
  avatars: true,
}

@Injectable()
export class UsersService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly rolesService : RolesService,
    private readonly subparametersService : SubparametersService
  ) {}

  async create ( createUserInput : CreateUserInput, creator?: User ) : Promise<User> {
    const { roleId } = createUserInput
    await this.rolesService.findOne( roleId )
    try {
      const { password } = createUserInput
      const hashedPassword = hashSync( password, 10 )
      const user = await this.prismaService.users.create({
        data: {
          ...createUserInput,
          password: hashedPassword,
          createdBy: creator?.id,
        }
      })
      return user
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll ( roles : ValidRoles[] ) {
    if ( roles.length === 0 ) 
      return await this.prismaService.users.findMany({ include: { ...userIncludes } })

    return await this.prismaService.users.findMany({
      where: {
        role: {
          name: { in: roles }
        }
      },
      include: { ...userIncludes }
    })
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
    const gender = await this.subparametersService.findOne( user.peopleInfo.genderId )
    user.peopleInfo.genderId = gender.name
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
    if ( !user ) throw new NotFoundException( `Email ${ email } does not exist` )
    return user
  }

  async update ( id : string, updateUserInput : UpdateUserInput, updater : User ) : Promise<User> {
    await this.findOne( id )
    const { roleId } = updateUserInput
    if( roleId ) await this.rolesService.findOne( roleId )
    try {
      const user = await this.prismaService.users.update({
        where: { id },
        data: {
          ...updateUserInput,
          updatedBy: updater.id
        }
      })
      return user
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) : Promise<User> {
    await this.findOne( id )
    try {
      const user = await this.prismaService.users.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id
        }
      })
      return user
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    const prismaError = extractPrismaExceptions( error )
    if ( prismaError ) throw new BadRequestException( prismaError )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
