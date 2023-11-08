import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateManagementUserInput, UpdateManagementUserInput } from './dto/inputs'
import { PeopleInfoService } from 'src/users/people-info/people-info.service'
import { UsersService } from 'src/users/users/users.service'
import { SubparametersService } from 'src/parametrics/subparameters/subparameters.service'
import { RolesService } from 'src/users/roles/roles.service'
// import { UserAvatarsService } from 'src/users/user-avatars/user-avatars.service'
// import { PhonesService } from 'src/contact-information/phones/phones.service'
// import { AddressesService } from 'src/contact-information/addresses/addresses.service'
// import { CreditCardsService } from 'src/payments/credit-cards/credit-cards.service'
import { User } from 'src/users/users/entities/user.entity'
import { ManagementUser } from './entities/management-user.entity'
import { IFindAllOptions } from 'src/common/interfaces'
import { PrismaService } from 'src/prisma'

export const getNotNullObjectValues = ( objectWithUndefinedOrUndefined : object ) => {
  const objectWithoutUndefinedOrNull = Object.entries( objectWithUndefinedOrUndefined ).reduce( ( acc, [ key, value ] ) => {
    if ( value !== undefined && value !== null ) acc[ key ] = value
    return acc
  } , {} )
  return objectWithoutUndefinedOrNull
}

@Injectable()
export class ManagementUsersService {

// PeopleInfoModule,
//     UsersModule,
//     SubparametersModule,
//     RolesModule,
//     UserAvatarsModule,
//     PhonesModule,
//     AddressesModule,
//     CreditCardsModule

  constructor (

    @Inject( PrismaService )
    private readonly prismaService        : PrismaService,

    private readonly peopleInfoService    : PeopleInfoService,
    private readonly usersService         : UsersService,
    private readonly subparametersService : SubparametersService,
    private readonly rolesService         : RolesService,
    // private readonly userAvatarsService   : UserAvatarsService,
    // private readonly phonesService        : PhonesService,
    // private readonly addressesService     : AddressesService,
    // private readonly creditCardsService   : CreditCardsService
  ) {}

  async create ( createManagementUserInput : CreateManagementUserInput, creator : User ) : Promise<ManagementUser> {
    const { name, paternalSurname, maternalSurname, genderId, birthdate, documentNumber, documentTypeId } = createManagementUserInput
    await this.subparametersService.findOne( genderId )
    if ( documentTypeId ) await this.subparametersService.findOne( documentTypeId )
    const peopleInfo = await this.peopleInfoService.create( {
      name, paternalSurname, maternalSurname,
      genderId, documentNumber, documentTypeId,
      birthdate: new Date( birthdate )
    }, creator )
    const { email, password, roleId } = createManagementUserInput
    await this.rolesService.findOne( roleId )
    const user = await this.usersService.create( { email, password, roleId, peopleInfoId: peopleInfo.id }, creator )
    // const peopleInfoWithRelations = await this.peopleInfoService.findOne( peopleInfo.id )
    // const userWithRelations = await this.usersService.findOne( user.id )
    // const avatars = await this.prismaService.userAvatars.findMany( { where: { userId: user.id } } )
    // const phones = await this.prismaService.phones.findMany( { where: { users: { some: { id: user.id } } } } )
    // const addresses = await this.prismaService.addresses.findMany( { where: { users: { some: { id: user.id } } } } )
    // const creditCards = await this.prismaService.creditCards.findMany( { where: { users: { some: { id: user.id } } } } )
    // const mainAvatar = avatars.find( avatar => avatar.isMain )
    // const mainPhone = await this.prismaService.phones.findFirst({ where: { users: { some: { id: user.id, isMain: true } } } })
    // const mainAddress = await this.prismaService.addresses.findFirst({ where: { users: { some: { id: user.id, isMain: true } } } })
    // return {
    //   id: userWithRelations.id,
    //   email: userWithRelations.email,
    //   isVerifiedEmail: userWithRelations.isVerifiedEmail,
    //   googleId: userWithRelations.googleId,
    //   status: userWithRelations.status,
    //   createdAt: userWithRelations.createdAt,
    //   updatedAt: userWithRelations.updatedAt,
    //   creator: userWithRelations.creator,
    //   updater: userWithRelations.updater,
    //   peopleInfo: peopleInfoWithRelations,
    //   role: userWithRelations.role,
    //   mainAvatar: mainAvatar?.url || null,
    //   mainPhone: mainPhone?.number || null,
    //   mainAddress: mainAddress,
    //   avatars,
    //   phones,
    //   addresses,
    //   creditCards,
    // }
    const userWithRelations = await this.findOne( user.id )
    return userWithRelations
  }

  async findAll ( { searchArgs, paginationArgs } : IFindAllOptions ) : Promise<ManagementUser[]> {
    const { limit, offset } = paginationArgs
    let { search = '' } = searchArgs
    if ( search === null ) search = ''
    const users = await this.prismaService.users.findMany( {
      where: {
        OR: [
          { email: { contains: search, mode: 'insensitive' } },
          { peopleInfo: { name: { contains: search, mode: 'insensitive' } } },
          { peopleInfo: { paternalSurname: { contains: search, mode: 'insensitive' } } },
          { peopleInfo: { maternalSurname: { contains: search, mode: 'insensitive' } } },
          { peopleInfo: { documentNumber: { contains: search, mode: 'insensitive' } } },
        ],
      },
      take: limit || 10,
      skip: offset || 0,
      orderBy: { createdAt: 'desc' },
      include: {
        creator: true,
        updater: true,
        peopleInfo: true,
        role: true,
      }
    } )

    const usersWithRelations = await Promise.all( users.map( async user => {
      const peopleInfo = await this.peopleInfoService.findOne( user.peopleInfoId )
      const mainAvatar = await this.prismaService.userAvatars.findFirst( { where: { userId: user.id, isMain: true } } )
      const mainPhone = await this.prismaService.phones.findFirst({ where: { users: { some: { id: user.id, isMain: true } } } })
      const mainAddress = await this.prismaService.addresses.findFirst({ where: { users: { some: { id: user.id, isMain: true } } } })
      const avatars = await this.prismaService.userAvatars.findMany( { where: { userId: user.id } } )
      const phones = await this.prismaService.phones.findMany( { where: { users: { some: { id: user.id } } } } )
      const addresses = await this.prismaService.addresses.findMany( { where: { users: { some: { id: user.id } } } } )
      const creditCards = await this.prismaService.creditCards.findMany( { where: { users: { some: { id: user.id } } } } )

      return {
        id: user.id,
        email: user.email,
        isVerifiedEmail: user.isVerifiedEmail,
        googleId: user.googleId,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        creator: user.creator,
        updater: user.updater,
        peopleInfo,
        role: user.role,
        mainAvatar: mainAvatar?.url || null,
        mainPhone: mainPhone?.number || null,
        mainAddress: mainAddress,
        avatars,
        phones,
        addresses,
        creditCards,
      }
    } ) )

    return usersWithRelations
  }

  async findOne ( id : string ) : Promise<ManagementUser> {
    const user = await this.usersService.findOne( id )
    if ( !user ) throw new NotFoundException( `User with ID ${ id } not found` )
    const peopleInfo = await this.peopleInfoService.findOne( user.peopleInfoId )
    const mainAvatar = await this.prismaService.userAvatars.findFirst( { where: { userId: user.id, isMain: true } } )
    const mainPhone = await this.prismaService.phones.findFirst({ where: { users: { some: { id: user.id, isMain: true } } } })
    const mainAddress = await this.prismaService.addresses.findFirst({ where: { users: { some: { id: user.id, isMain: true } } } })
    const avatars = await this.prismaService.userAvatars.findMany( { where: { userId: user.id } } )
    const phones = await this.prismaService.phones.findMany( { where: { users: { some: { id: user.id } } } } )
    const addresses = await this.prismaService.addresses.findMany( { where: { users: { some: { id: user.id } } } } )
    const creditCards = await this.prismaService.creditCards.findMany( { where: { users: { some: { id: user.id } } } } )

    return {
      id: user.id,
      email: user.email,
      isVerifiedEmail: user.isVerifiedEmail,
      googleId: user.googleId,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      creator: user.creator,
      updater: user.updater,
      peopleInfo,
      role: user.role,
      mainAvatar: mainAvatar?.url || null,
      mainPhone: mainPhone?.number || null,
      mainAddress: mainAddress,
      avatars,
      phones,
      addresses,
      creditCards,
    }
  }

  async update ( id : string, updateManagementUserInput : UpdateManagementUserInput, updater : User ) : Promise<ManagementUser> {
    const beforeUser = await this.findOne( id )
    const { name, paternalSurname, maternalSurname, genderId, birthdate, documentNumber, documentTypeId } = updateManagementUserInput
    if ( genderId ) await this.subparametersService.findOne( genderId )
    if ( documentTypeId ) await this.subparametersService.findOne( documentTypeId )
    const peopleWithoutNull = getNotNullObjectValues( { name, paternalSurname, maternalSurname, genderId, birthdate, documentNumber, documentTypeId } )
    await this.peopleInfoService.update( beforeUser.peopleInfo.id, {
      ...peopleWithoutNull,
      id: beforeUser.peopleInfo.id
    } , updater )
    const { email, password, roleId, status } = updateManagementUserInput
    if ( roleId ) await this.rolesService.findOne( roleId )
    const userWithoutNull = getNotNullObjectValues( { email, password, roleId, status } )
    await this.usersService.update( beforeUser.id, {
      ...userWithoutNull,
      id
    } , updater )
    const userWithRelations = await this.findOne( id )
    return userWithRelations
  }

  async deactivate ( id : string, updater : User ) : Promise<ManagementUser> {
    await this.findOne( id )
    await this.usersService.deactivate( id, updater )
    const userWithRelations = await this.findOne( id )
    return userWithRelations
  }
}
