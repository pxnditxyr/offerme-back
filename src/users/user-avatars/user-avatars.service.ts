import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common'
import { CreateUserAvatarInput, UpdateUserAvatarInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'

@Injectable()
export class UserAvatarsService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService
  ) {}

  async create ( createUserAvatarInput : CreateUserAvatarInput ) {
    try {
      const userAvatar = await this.prismaService.userAvatars.create({
        data: { ...createUserAvatarInput }
      })
      return userAvatar
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () {
    const userAvatars = await this.prismaService.userAvatars.findMany({
      include: {
        user: true,
        creator: true,
        updater: true
      }
    })
    return userAvatars
  }

  async findOne ( id : string ) {
    const userAvatar = await this.prismaService.userAvatars.findUnique({
      where: { id },
      include: {
        user: true,
        creator: true,
        updater: true
      }
    })
    return userAvatar
  }

  async update ( id : string, updateUserAvatarInput : UpdateUserAvatarInput ) {
    try {
      const userAvatar = await this.prismaService.userAvatars.update({
        where: { id },
        data: { ...updateUserAvatarInput }
      })
      return userAvatar
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string ) {
    try {
      const userAvatar = await this.prismaService.userAvatars.update({
        where: { id },
        data: { status: false }
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
