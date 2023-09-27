import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { ParametricService } from './parametric.service'
import { Parameters } from './entities/parameters.entity'
import { CreateParametricInput } from './dto/create-parametric.input'
import { UpdateParametricInput } from './dto/update-parametric.input'

@Resolver( () => Parameters )
export class ParametricResolver {
  constructor(private readonly parametricService: ParametricService) {}

  @Mutation( () => Parameters )
  createParametric( @Args( 'createParametricInput' ) createParametricInput: CreateParametricInput ) {
    return this.parametricService.create(createParametricInput)
  }

  @Query(() => [ Parameters ], { name: 'parametric' })
  findAll() {
    return this.parametricService.findAll()
  }

  @Query( () => Parameters, { name: 'parametric' } )
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.parametricService.findOne(id)
  }

  @Mutation( () => Parameters )
  updateParametric( @Args( 'updateParametricInput' ) updateParametricInput: UpdateParametricInput ) {
    return this.parametricService.update( updateParametricInput.id, updateParametricInput )
  }

  @Mutation(() => Parameters)
  removeParametric( @Args( 'id', { type: () => Int } ) id: number ) {
    return this.parametricService.remove(id)
  }
}
