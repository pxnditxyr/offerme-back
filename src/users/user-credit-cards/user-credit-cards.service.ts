import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateUserCreditCardInput, UpdateUserCreditCardInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { CreditCardsService } from 'src/payments/credit-cards/credit-cards.service'
import { UsersService } from '../users/users.service'
import { User } from '../users/entities/user.entity'
import { UserCreditCard } from './entities/user-credit-card.entity'
import { extractPrismaExceptions } from 'src/common/exception-catchers'
import { IFindAllOptions } from 'src/common/interfaces'

const userCreditCardIncludes = {
  creditCard: true,
  user: true,
  creator: true,
  updater: true
}

@Injectable()
export class UserCreditCardsService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly creditCardsService : CreditCardsService,
    private readonly usersService : UsersService
  ) {}

  async create ( createUserCreditCardInput : CreateUserCreditCardInput, user : User ) : Promise<UserCreditCard> {
    const { userId, creditCardId } = createUserCreditCardInput
    await this.usersService.findOne( userId )
    await this.creditCardsService.findOne( creditCardId )
    try {
      const userCreditCard = await this.prismaService.userCreditCards.create({
        data: {
          ...createUserCreditCardInput,
          createdBy: user.id,
        }
      })
      return userCreditCard
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll ( { paginationArgs } : IFindAllOptions ) {
    const { limit, offset } = paginationArgs
    try {
      const userCreditCards = await this.prismaService.userCreditCards.findMany({
        take: limit,
        skip: offset,
        include: { ...userCreditCardIncludes }
      })
      return userCreditCards
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findOne ( id : string ) {
    const userCreditCard = await this.prismaService.userCreditCards.findUnique({
      where: { id },
      include: { ...userCreditCardIncludes }
    })
    if ( !userCreditCard ) throw new NotFoundException( `UserCreditCard with id ${ id } not found` )
    return userCreditCard
  }

  async update ( id : string, updateUserCreditCardInput : UpdateUserCreditCardInput, updater : User ) : Promise<UserCreditCard> {
    await this.findOne( id )
    const { userId, creditCardId } = updateUserCreditCardInput
    if ( userId ) await this.usersService.findOne( userId )
    if ( creditCardId ) await this.creditCardsService.findOne( creditCardId )
    try {
      const userCreditCard = await this.prismaService.userCreditCards.update({
        where: { id },
        data: {
          ...updateUserCreditCardInput,
          updatedBy: updater.id
        },
        include: { ...userCreditCardIncludes }
      })
      return userCreditCard
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) : Promise<UserCreditCard> {
    await this.findOne( id )
    try {
      const userCreditCard = await this.prismaService.userCreditCards.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id
        },
        include: { ...userCreditCardIncludes }
      })
      return userCreditCard
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
