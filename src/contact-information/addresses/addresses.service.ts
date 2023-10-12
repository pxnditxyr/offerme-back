import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateAddressInput, UpdateAddressInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { User } from 'src/users/users/entities/user.entity'
import { Address } from './entities/address.entity'

const addressIncludes = {
  creator: true,
  updater: true,
  users: true,
  companies: true,
}

@Injectable()
export class AddressesService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService
  ) {}

  async create ( createAddressInput : CreateAddressInput, creator : User ) : Promise<Address> {
    try {
      const address = await this.prismaService.addresses.create({
        data: {
          ...createAddressInput,
          createdBy: creator.id,
        }
      })
      return address
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () {
    const addresses = await this.prismaService.addresses.findMany({
      include: { ...addressIncludes }
    })
    return addresses
  }

  async findOne ( id : string ) {
    const address = await this.prismaService.addresses.findUnique({
      where: { id },
      include: { ...addressIncludes }
    })
    if ( !address ) throw new NotFoundException( `Address with ID ${ id } not found` )
    return address
  }

  async update( id : string, updateAddressInput : UpdateAddressInput, updater : User ) : Promise<Address> {
    await this.findOne( id )
    try {
      const address = await this.prismaService.addresses.update({
        where: { id },
        data: {
          ...updateAddressInput,
          updatedBy: updater.id,
        }
      })
      return address
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) : Promise<Address> {
    await this.findOne( id )
    try {
      const address = await this.prismaService.addresses.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id,
        }
      })
      return address
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
