import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { ClickCounterPerPeriodService } from './click-counter-per-period.service'
import { ClickCounterPerPeriod } from './entities/click-counter-per-period.entity'
import { CreateClickCounterPerPeriodInput, UpdateClickCounterPerPeriodInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { User } from 'src/users/users/entities/user.entity'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'

@Resolver( () => ClickCounterPerPeriod )
export class ClickCounterPerPeriodResolver {
  constructor (
    private readonly clickCounterPerPeriodService : ClickCounterPerPeriodService
  ) {}

  @Mutation( () => ClickCounterPerPeriod )
  @UseGuards( JwtAuthGuard )
  async createClickCounterPerPeriod (
    @Args( 'createClickCounterPerPeriodInput' ) createClickCounterPerPeriodInput : CreateClickCounterPerPeriodInput,
    @CurrentUser([ ValidRoles.ADMIN ]) creator : User
  ) : Promise<ClickCounterPerPeriod> {
    return this.clickCounterPerPeriodService.create( createClickCounterPerPeriodInput, creator )
  }

  @Query( () => [ ClickCounterPerPeriod ], { name: 'clickCounterPerPeriods' } )
  async findAll (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs: SearchArgs
  ) : Promise<ClickCounterPerPeriod[]> {
    return this.clickCounterPerPeriodService.findAll({ searchArgs, paginationArgs })
  }

  @Query( () => ClickCounterPerPeriod, { name: 'clickCounterPerPeriod' } )
  async findOne (
    @Args('id', { type: () => String }) id : string
  ) : Promise<ClickCounterPerPeriod> {
    return this.clickCounterPerPeriodService.findOne( id )
  }

  @Mutation( () => ClickCounterPerPeriod )
  @UseGuards( JwtAuthGuard )
  async updateClickCounterPerPeriod (
    @Args( 'updateClickCounterPerPeriodInput' ) updateClickCounterPerPeriodInput: UpdateClickCounterPerPeriodInput,
    @CurrentUser([ ValidRoles.ADMIN ]) updater : User
  ) : Promise<ClickCounterPerPeriod> {
    return this.clickCounterPerPeriodService.update( updateClickCounterPerPeriodInput.id, updateClickCounterPerPeriodInput, updater )
  }

  @Mutation( () => ClickCounterPerPeriod )
  @UseGuards( JwtAuthGuard )
  async toggleStatusClickCounterPerPeriod (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) updater : User
  ) : Promise<ClickCounterPerPeriod> {
    return this.clickCounterPerPeriodService.toggleStatus( id, updater )
  }

  @Mutation( () => ClickCounterPerPeriod )
  async addClickClickCounterPerPeriod (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) companyId : string,
  ) : Promise<ClickCounterPerPeriod> {
    return this.clickCounterPerPeriodService.addClick( companyId )
  }
}
