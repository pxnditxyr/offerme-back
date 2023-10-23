import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateUserPhoneInput, UpdateUserPhoneInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { UsersService } from '../users/users.service'
import { PhonesService } from 'src/contact-information/phones/phones.service'
import { User } from '../users/entities/user.entity'
import { UserPhone } from './entities/user-phone.entity'
import { extractPrismaExceptions } from 'src/common/exception-catchers'
import { IFindAllOptions } from 'src/common/interfaces'

const userPhoneIncludes = {
  phone: true,
  user: true,
  creator: true,
  updater: true
}

@Injectable()
export class UserPhonesService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly usersService : UsersService,
    private readonly phonesService : PhonesService
  ) {}

  async create ( createUserPhoneInput: CreateUserPhoneInput, creator : User ) : Promise<UserPhone> {
    const { userId, phoneId } = createUserPhoneInput
    await this.usersService.findOne( userId )
    await this.phonesService.findOne( phoneId )
    try {
      await this.changeMainPhone( userId, creator )
      const userPhone = await this.prismaService.userPhones.create({
        data: {
          ...createUserPhoneInput,
          createdBy: creator.id
        }
      })
      return userPhone
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll ( { paginationArgs, searchArgs } : IFindAllOptions ) {
    const { limit, offset } = paginationArgs
    const { search } = searchArgs

    try {
      const userPhones = await this.prismaService.userPhones.findMany({
        take: limit,
        skip: offset,
        where: {
          phone: {
            number: { contains: search }
          }
        },
        include: { ...userPhoneIncludes }
      })
      return userPhones
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findOne ( id : string ) {
    const userPhone = await this.prismaService.userPhones.findUnique({
      where: { id },
      include: { ...userPhoneIncludes }
    })
    if ( !userPhone ) throw new NotFoundException( `UserPhone with id ${ id } not found` )
    return userPhone
  }

  async update ( id : string, updateUserPhoneInput : UpdateUserPhoneInput, updater : User ) : Promise<UserPhone> {
    const { userId, phoneId } = updateUserPhoneInput
    if ( userId ) await this.usersService.findOne( userId )
    if ( phoneId ) await this.phonesService.findOne( phoneId )
    try {
      const userPhone = await this.prismaService.userPhones.update({
        where: { id },
        data: {
          ...updateUserPhoneInput,
          updatedBy: updater.id
        }
      })
      return userPhone
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private async findMainPhone ( userId : string ) {
    const userPhone = await this.prismaService.userPhones.findFirst({
      where: {
        userId,
        isMain: true
      },
    })
    return userPhone
  }

  private async changeMainPhone ( userId : string, updater : User ) : Promise<UserPhone | null> {
    const mainPhone = await this.findMainPhone( userId )
    if ( !mainPhone ) return null
    try {
      const userPhone = await this.prismaService.userPhones.update({
        where: { id: mainPhone.id },
        data: {
          isMain: false,
          updatedBy: updater.id
        }
      })
      return userPhone
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) : Promise<UserPhone> {
    await this.findOne( id )
    try {
      const userPhone = await this.prismaService.userPhones.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id
        }
      })
      return userPhone
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    const prismaErrors = extractPrismaExceptions( error )
    if ( prismaErrors ) throw new BadRequestException( prismaErrors )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }

}
