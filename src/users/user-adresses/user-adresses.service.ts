import { Injectable } from '@nestjs/common';
import { CreateUserAdressInput } from './dto/create-user-adress.input';
import { UpdateUserAdressInput } from './dto/update-user-adress.input';

@Injectable()
export class UserAdressesService {
  create(createUserAdressInput: CreateUserAdressInput) {
    return 'This action adds a new userAdress';
  }

  findAll() {
    return `This action returns all userAdresses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAdress`;
  }

  update(id: number, updateUserAdressInput: UpdateUserAdressInput) {
    return `This action updates a #${id} userAdress`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAdress`;
  }
}
