import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common'
import { CreatePhoneInput, UpdatePhoneInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { Phone } from './entities/phone.entity'
import { User } from 'src/users/users/entities/user.entity'

const phoneIncludes = {
  users: true,
  phoneType: true,
  creator: true,
  updater: true
}

@Injectable()
export class PhonesService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService
  ) {}

  async create ( createPhoneInput : CreatePhoneInput, user : User ) : Promise<Phone> {

    try {
      const phone = await this.prismaService.phones.create({
        data: {
          ...createPhoneInput,
          createdBy: user.id
        }
      })
      return phone
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () {
    const phones = await this.prismaService.phones.findMany({
      include: { ...phoneIncludes }
    })
    return phones
  }

  async findOne ( id : string ) {
    const phone = await this.prismaService.phones.findUnique({
      where: { id },
      include: { ...phoneIncludes }
    })
    return phone
  }

  async update ( id : string, updatePhoneInput : UpdatePhoneInput, user : User ) : Promise<Phone> {
    try {
      const phone = await this.prismaService.phones.update({
        where: { id },
        data: {
          ...updatePhoneInput,
          updatedBy: user.id
        }
      })
      return phone
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, user : User ) : Promise<Phone> {
    try {
      const phone = await this.prismaService.phones.update({
        where: { id },
        data: {
          status: false,
          updatedBy: user.id
        }
      })
      return phone
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
