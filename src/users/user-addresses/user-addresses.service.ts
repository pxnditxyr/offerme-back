import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateUserAddressInput, UpdateUserAddressInput } from './dto/inputs'
import { User } from '../users/entities/user.entity'
import { PrismaService } from 'src/prisma'
import { UserAddress } from './entities/user-address.entity'
import { UsersService } from '../users/users.service'
import { AddressesService } from 'src/contact-information/addresses/addresses.service'
import { extractPrismaExceptions } from 'src/common/exception-catchers'
import { IFindAllOptions } from 'src/common/interfaces'

const userAddressIncludes = {
  address: true,
  user: true,
  creator: true,
  updater: true
}

@Injectable()
export class UserAddressesService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly usersService : UsersService,
    private readonly addressesService : AddressesService
  ) {}

  async create ( createUserAddressInput : CreateUserAddressInput, creator : User ) : Promise<UserAddress> {
    const { userId, addressId } = createUserAddressInput
    await this.usersService.findOne( userId )
    await this.addressesService.findOne( addressId )
    try {
      const userAddress = await this.prismaService.userAddresses.create({
        data: {
          ...createUserAddressInput,
          createdBy: creator.id
        }
      })
      return userAddress
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll ( { paginationArgs, searchArgs } : IFindAllOptions ) {
    const { limit, offset } = paginationArgs
    const { search } = searchArgs
    try {
      const userAddresses = await this.prismaService.userAddresses.findMany({
        take: limit,
        skip: offset,
        where: {
          address: {
            street: { contains: search }
          }
        },
        include: { ...userAddressIncludes }
      })
      return userAddresses
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findOne ( id : string ) {
    const userAddress = await this.prismaService.userAddresses.findUnique({
      where: { id },
      include: { ...userAddressIncludes }
    })
    if ( !userAddress ) throw new NotFoundException( `The userAddress with the id: ${ id } does not exist` )
    return userAddress
  }

  async update ( id : string, updateUserAddressInput : UpdateUserAddressInput, updater : User ) : Promise<UserAddress> {
    await this.findOne( id )
    const { addressId, userId } = updateUserAddressInput
    if ( addressId ) await this.addressesService.findOne( addressId )
    if ( userId ) await this.usersService.findOne( userId )
    try {
      const userAddress = await this.prismaService.userAddresses.update({
        where: { id },
        data: {
          ...updateUserAddressInput,
          updatedBy: updater.id
        }
      })
      return userAddress
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) : Promise<UserAddress> {
    await this.findOne( id )
    try {
      const userAddress = await this.prismaService.userAddresses.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id
        }
      })
      return userAddress
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
