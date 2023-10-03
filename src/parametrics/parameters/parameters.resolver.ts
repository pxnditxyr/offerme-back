import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ParametersService } from './parameters.service'
import { Parameter } from './entities/parameter.entity'
import { CreateParameterInput, UpdateParameterInput } from './dto/inputs'

@Resolver( () => Parameter )
export class ParametersResolver {
  constructor( private readonly parametersService : ParametersService ) {}

  @Mutation( () => Parameter )
  async createParameter (
    @Args( 'createParameterInput' ) createParameterInput : CreateParameterInput
  ) : Promise<Parameter> {
    return await this.parametersService.create( createParameterInput )
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
  async updateParameter (
    @Args( 'updateParameterInput' ) updateParameterInput : UpdateParameterInput,
  ) : Promise<Parameter> {
    return await this.parametersService.update(updateParameterInput.id, updateParameterInput)
  }

  @Mutation( () => Parameter )
  async deactivateParameter (
    @Args( 'id', { type: () => String } ) id : string
  ) : Promise<Parameter> {
    return await this.parametersService.deactivate( id )
  }
}
