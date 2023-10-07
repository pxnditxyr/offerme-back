import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { ParseUUIDPipe } from '@nestjs/common'
import { SubparametersService } from './subparameters.service'
import { Subparameter } from './entities/subparameter.entity'
import { CreateSubparameterInput, UpdateSubparameterInput } from './dto/inputs'

@Resolver( () => Subparameter )
export class SubparametersResolver {

  constructor(
    private readonly subparametersService: SubparametersService
  ) {}

  @Mutation( () => Subparameter )
  async createSubparameter (
    @Args( 'createSubparameterInput' ) createSubparameterInput : CreateSubparameterInput
  ) : Promise<Subparameter> {
    return await this.subparametersService.create( createSubparameterInput )
  }

  @Query( () => [ Subparameter ], { name: 'subparameters' } )
  async findAll () {
    return await this.subparametersService.findAll()
  }

  @Query( () => Subparameter, { name: 'subparameter' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return await this.subparametersService.findOne( id )
  }

  @Mutation( () => Subparameter )
  async updateSubparameter (
    @Args( 'updateSubparameterInput' ) updateSubparameterInput : UpdateSubparameterInput
  ) : Promise<Subparameter> {
    return await this.subparametersService.update( updateSubparameterInput.id, updateSubparameterInput )
  }

  @Mutation( () => Subparameter )
  async deactivateSubparameter (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) : Promise<Subparameter> {
    return await this.subparametersService.deactivate( id )
  }
}
