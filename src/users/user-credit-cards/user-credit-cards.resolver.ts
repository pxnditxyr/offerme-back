import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql'
import { UserCreditCardsService } from './user-credit-cards.service'
import { UserCreditCard } from './entities/user-credit-card.entity'
import { CreateUserCreditCardInput, UpdateUserCreditCardInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from '../users/entities/user.entity'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'

@UseGuards( JwtAuthGuard )
@Resolver( () => UserCreditCard )
export class UserCreditCardsResolver {
  constructor (
    private readonly userCreditCardsService : UserCreditCardsService
  ) {}

  @Mutation( () => UserCreditCard )
  async createUserCreditCard (
    @Args( 'createUserCreditCardInput' ) createUserCreditCardInput : CreateUserCreditCardInput,
    @CurrentUser([ ValidRoles.USER, ValidRoles.ADMIN ]) creator : User
  ) : Promise<UserCreditCard> {
    return await this.userCreditCardsService.create( createUserCreditCardInput, creator )
  }

  @Query( () => [ UserCreditCard ], { name: 'userCreditCards' } )
  async findAll (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs
  ) {
    return await this.userCreditCardsService.findAll({ paginationArgs, searchArgs })
  }

  @Query( () => UserCreditCard, { name: 'userCreditCard' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return await this.userCreditCardsService.findOne( id )
  }

  @Mutation( () => UserCreditCard )
  async updateUserCreditCard (
    @Args( 'updateUserCreditCardInput' ) updateUserCreditCardInput : UpdateUserCreditCardInput,
    @CurrentUser([ ValidRoles.USER, ValidRoles.ADMIN ]) updater : User
  ) : Promise<UserCreditCard> {
    return await this.userCreditCardsService.update( updateUserCreditCardInput.id, updateUserCreditCardInput, updater )
  }

  @Mutation( () => UserCreditCard )
  async deactivateUserCreditCard (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.USER, ValidRoles.ADMIN ]) updater : User
  ) : Promise<UserCreditCard> {
    return await this.userCreditCardsService.deactivate( id, updater )
  }
}
