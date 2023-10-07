import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { PeopleInfoService } from './people-info.service'
import { PeopleInfo } from './entities/people-info.entity'
import { CreatePeopleInfoInput, UpdatePeopleInfoInput } from './dto/inputs'
import { ParseUUIDPipe } from '@nestjs/common'

@Resolver( () => PeopleInfo )
export class PeopleInfoResolver {
  constructor(
    private readonly peopleInfoService : PeopleInfoService
  ) {}

  @Mutation( () => PeopleInfo )
  async createPeopleInfo (
    @Args( 'createPeopleInfoInput' ) createPeopleInfoInput : CreatePeopleInfoInput
  ) : Promise<PeopleInfo> {
    return await this.peopleInfoService.create( createPeopleInfoInput )
  }

  @Query( () => [ PeopleInfo ], { name: 'peopleInfo' } )
  async findAll () {
    return await this.peopleInfoService.findAll()
  }

  @Query( () => PeopleInfo, { name: 'personInfo' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id: string ) {
    return await this.peopleInfoService.findOne( id )
  }

  @Mutation( () => PeopleInfo )
  async updatePeopleInfo (
    @Args( 'updatePeopleInfoInput' ) updatePeopleInfoInput : UpdatePeopleInfoInput
  ) : Promise<PeopleInfo> {
    return await this.peopleInfoService.update( updatePeopleInfoInput.id, updatePeopleInfoInput )
  }

  @Mutation( () => PeopleInfo )
  async deactivatePeopleInfo (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) : Promise<PeopleInfo> {
    return await this.peopleInfoService.deactivate( id )
  }
}
