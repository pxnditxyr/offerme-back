import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { SubparametersService } from './subparameters.service'
import { Subparameter } from './entities/subparameter.entity'
import { CreateSubparameterInput, UpdateSubparameterInput } from './dto/inputs'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { User } from 'src/users/users/entities/user.entity'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'

@Resolver( () => Subparameter )
export class SubparametersResolver {

  constructor(
    private readonly subparametersService: SubparametersService
  ) {}

  @Mutation( () => Subparameter )
  @UseGuards( JwtAuthGuard )
  async createSubparameter (
    @Args( 'createSubparameterInput' ) createSubparameterInput : CreateSubparameterInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<Subparameter> {
    return await this.subparametersService.create( createSubparameterInput, user )
  }

  @Query( () => [ Subparameter ], { name: 'subparameters' } )
  async findAll (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs: SearchArgs
  ) {
    return await this.subparametersService.findAll({ paginationArgs, searchArgs })
  }

  @Query( () => Subparameter, { name: 'subparameter' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return await this.subparametersService.findOne( id )
  }

  @Mutation( () => Subparameter )
  @UseGuards( JwtAuthGuard )
  async updateSubparameter (
    @Args( 'updateSubparameterInput' ) updateSubparameterInput : UpdateSubparameterInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<Subparameter> {
    return await this.subparametersService.update( updateSubparameterInput.id, updateSubparameterInput, user )
  }

  @Mutation( () => Subparameter )
  @UseGuards( JwtAuthGuard )
  async deactivateSubparameter (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<Subparameter> {
    return await this.subparametersService.deactivate( id, user )
  }

  @Query( () => [ Subparameter ], { name: 'subparametersByParameterName' } )
  async findAllByParameterName (
    @Args( 'parameterName' ) parameterName : string,
    @Args() searchArgs : SearchArgs,
    @Args() paginationArgs : PaginationArgs
  ) : Promise<Subparameter[]> {
    return await this.subparametersService.findAllByParameterName( parameterName, { searchArgs, paginationArgs } )
  }
}
