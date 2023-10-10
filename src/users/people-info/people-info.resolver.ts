import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { PeopleInfoService } from './people-info.service'
import { PeopleInfo } from './entities/people-info.entity'
import { CreatePeopleInfoInput, UpdatePeopleInfoInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from '../users/entities/user.entity'

@UseGuards( JwtAuthGuard )
@Resolver( () => PeopleInfo )
export class PeopleInfoResolver {
  constructor(
    private readonly peopleInfoService : PeopleInfoService
  ) {}

  @Mutation( () => PeopleInfo )
  async createPeopleInfo (
    @Args( 'createPeopleInfoInput' ) createPeopleInfoInput : CreatePeopleInfoInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<PeopleInfo> {
    return await this.peopleInfoService.create( createPeopleInfoInput, user )
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
    @Args( 'updatePeopleInfoInput' ) updatePeopleInfoInput : UpdatePeopleInfoInput,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<PeopleInfo> {
    return await this.peopleInfoService.update( updatePeopleInfoInput.id, updatePeopleInfoInput, user )
  }

  @Mutation( () => PeopleInfo )
  async deactivatePeopleInfo (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<PeopleInfo> {
    return await this.peopleInfoService.deactivate( id, user )
  }
}
