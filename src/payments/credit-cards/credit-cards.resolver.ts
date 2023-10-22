import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { CreditCardsService } from './credit-cards.service'
import { CreditCard } from './entities/credit-card.entity'
import { CreateCreditCardInput, UpdateCreditCardInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'

@UseGuards( JwtAuthGuard )
@Resolver( () => CreditCard )
export class CreditCardsResolver {
  constructor (
    private readonly creditCardsService : CreditCardsService
  ) {}

  @Mutation( () => CreditCard )
  async createCreditCard (
    @Args( 'createCreditCardInput' ) createCreditCardInput : CreateCreditCardInput,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) creator : User
  ) : Promise<CreditCard> {
    return await this.creditCardsService.create( createCreditCardInput, creator )
  }

  @Query( () => [ CreditCard ], { name: 'creditCards' } )
  async findAll (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs
  ) {
    return await this.creditCardsService.findAll({ paginationArgs, searchArgs })
  }

  @Query( () => CreditCard, { name: 'creditCard' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return await this.creditCardsService.findOne( id )
  }

  @Mutation( () => CreditCard )
  async updateCreditCard (
    @Args( 'updateCreditCardInput' ) updateCreditCardInput : UpdateCreditCardInput,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) updater : User
  ) : Promise<CreditCard> {
    return await this.creditCardsService.update( updateCreditCardInput.id, updateCreditCardInput, updater )
  }

  @Mutation( () => CreditCard )
  async deactivateCreditCard (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) updater : User
  ) : Promise<CreditCard> {
    return this.creditCardsService.deactivate( id, updater )
  }
}
