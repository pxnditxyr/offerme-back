import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateCreditCardInput, UpdateCreditCardInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { User } from 'src/users/users/entities/user.entity'
import { CreditCard } from './entities/credit-card.entity'
import { SubparametersService } from 'src/parametrics/subparameters/subparameters.service'
import { extractPrismaExceptions } from 'src/common/exception-catchers'
import { IFindAllOptions } from 'src/common/interfaces'

const creditCardIncludes = {
  creditCardType: true,
  creator: true,
  updater: true,
  users: true,
  promotionPayments: true
}

@Injectable()
export class CreditCardsService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly subparametersService : SubparametersService
  ) {}

  async create ( createCreditCardInput : CreateCreditCardInput, creator : User ) : Promise<CreditCard> {
    const { creditCardTypeId } = createCreditCardInput
    await this.subparametersService.findOne( creditCardTypeId )
    try {
      const creditCard = await this.prismaService.creditCards.create({
        data: {
          ...createCreditCardInput,
          createdBy: creator.id,
        }
      })
      return creditCard
    } catch ( error ) {
      throw new Error( error )
    }
  }

  async findAll ( { paginationArgs, searchArgs } : IFindAllOptions ) {
    const { offset, limit } = paginationArgs
    const { search } = searchArgs
    try {
      const creditCards = await this.prismaService.creditCards.findMany({
        skip: offset,
        take: limit,
        where: {
          number: {
            contains: search
          }
        },
        include: { ...creditCardIncludes }
      })
      return creditCards
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findOne ( id : string ) {
    const creditCard = await this.prismaService.creditCards.findUnique({
      where: { id },
      include: { ...creditCardIncludes }
    })
    if ( !creditCard ) throw new NotFoundException( `Credit card with id ${ id } not found` )
    return creditCard
  }

  async update ( id : string, updateCreditCardInput : UpdateCreditCardInput, updater : User ) : Promise<CreditCard> {
    await this.findOne( id )
    const { creditCardTypeId } = updateCreditCardInput
    if ( creditCardTypeId ) await this.subparametersService.findOne( creditCardTypeId )
    try {
      const creditCard = await this.prismaService.creditCards.update({
        where: { id },
        data: {
          ...updateCreditCardInput,
          updatedBy: updater.id,
        }
      })
      return creditCard
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) : Promise<CreditCard> {
    await this.findOne( id )
    try {
      const creditCard = await this.prismaService.creditCards.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id,
        }
      })
      return creditCard
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
