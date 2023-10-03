import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PeopleInfoService } from './people-info.service';
import { PeopleInfo } from './entities/people-info.entity';
import { CreatePeopleInfoInput } from './dto/create-people-info.input';
import { UpdatePeopleInfoInput } from './dto/update-people-info.input';

@Resolver(() => PeopleInfo)
export class PeopleInfoResolver {
  constructor(private readonly peopleInfoService: PeopleInfoService) {}

  @Mutation(() => PeopleInfo)
  createPeopleInfo(@Args('createPeopleInfoInput') createPeopleInfoInput: CreatePeopleInfoInput) {
    return this.peopleInfoService.create(createPeopleInfoInput);
  }

  @Query(() => [PeopleInfo], { name: 'peopleInfo' })
  findAll() {
    return this.peopleInfoService.findAll();
  }

  @Query(() => PeopleInfo, { name: 'peopleInfo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.peopleInfoService.findOne(id);
  }

  @Mutation(() => PeopleInfo)
  updatePeopleInfo(@Args('updatePeopleInfoInput') updatePeopleInfoInput: UpdatePeopleInfoInput) {
    return this.peopleInfoService.update(updatePeopleInfoInput.id, updatePeopleInfoInput);
  }

  @Mutation(() => PeopleInfo)
  removePeopleInfo(@Args('id', { type: () => Int }) id: number) {
    return this.peopleInfoService.remove(id);
  }
}
