import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { ParametersService } from './parameters.service'
import { Parameter } from './entities/parameter.entity'
import { CreateParameterInput, UpdateParameterInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'

@Resolver( () => Parameter )
export class ParametersResolver {
  constructor(
    private readonly parametersService : ParametersService
  ) {}

  @Mutation( () => Parameter )
  @UseGuards( JwtAuthGuard )
  async createParameter (
    @Args( 'createParameterInput' ) createParameterInput : CreateParameterInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<Parameter> {
    return await this.parametersService.create( createParameterInput, user )
  }

  @Query( () => [ Parameter ], { name: 'parameters' } )
  async findAll () {
    return await this.parametersService.findAll()
  }

  @Query( () => Parameter, { name: 'parameter' } )
  async findOne (
    @Args( 'term', { type: () => String } ) term : string
  ) {
    return await this.parametersService.findOne( term )
  }

  @Mutation( () => Parameter )
  @UseGuards( JwtAuthGuard )
  async updateParameter (
    @Args( 'updateParameterInput' ) updateParameterInput : UpdateParameterInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<Parameter> {
    return await this.parametersService.update( updateParameterInput.id, updateParameterInput, user )
  }

  @Mutation( () => Parameter )
  @UseGuards( JwtAuthGuard )
  async deactivateParameter (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<Parameter> {
    return await this.parametersService.deactivate( id, user )
  }
}
