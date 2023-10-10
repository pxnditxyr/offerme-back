import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common'
import { CreateUserAvatarInput, UpdateUserAvatarInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { User } from '../users/entities/user.entity'

const userAvatarInclude = {
  creator: true,
  updater: true,
  user: true,
}

@Injectable()
export class UserAvatarsService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService
  ) {}

  async create ( createUserAvatarInput : CreateUserAvatarInput, creator : User ) {
    try {
      const userAvatar = await this.prismaService.userAvatars.create({
        data: {
          ...createUserAvatarInput,
          createdBy: creator.id
        }
      })
      return userAvatar
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () {
    const userAvatars = await this.prismaService.userAvatars.findMany({
      include: { ...userAvatarInclude }
    })
    return userAvatars
  }

  async findOne ( id : string ) {
    const userAvatar = await this.prismaService.userAvatars.findUnique({
      where: { id },
      include: { ...userAvatarInclude }
    })
    return userAvatar
  }

  async update ( id : string, updateUserAvatarInput : UpdateUserAvatarInput, updater : User ) {
    try {
      const userAvatar = await this.prismaService.userAvatars.update({
        where: { id },
        data: {
          ...updateUserAvatarInput,
          updatedBy: updater.id
        }
      })
      return userAvatar
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) {
    try {
      const userAvatar = await this.prismaService.userAvatars.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id
        }
      })
      return userAvatar
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
