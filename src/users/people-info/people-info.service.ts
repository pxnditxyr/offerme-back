import { Injectable } from '@nestjs/common';
import { CreatePeopleInfoInput } from './dto/create-people-info.input';
import { UpdatePeopleInfoInput } from './dto/update-people-info.input';

@Injectable()
export class PeopleInfoService {
  create(createPeopleInfoInput: CreatePeopleInfoInput) {
    return 'This action adds a new peopleInfo';
  }

  findAll() {
    return `This action returns all peopleInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} peopleInfo`;
  }

  update(id: number, updatePeopleInfoInput: UpdatePeopleInfoInput) {
    return `This action updates a #${id} peopleInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} peopleInfo`;
  }
}
