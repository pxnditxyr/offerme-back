import { Injectable } from '@nestjs/common';
import { CreateUserPhoneInput } from './dto/create-user-phone.input';
import { UpdateUserPhoneInput } from './dto/update-user-phone.input';

@Injectable()
export class UserPhonesService {
  create(createUserPhoneInput: CreateUserPhoneInput) {
    return 'This action adds a new userPhone';
  }

  findAll() {
    return `This action returns all userPhones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userPhone`;
  }

  update(id: number, updateUserPhoneInput: UpdateUserPhoneInput) {
    return `This action updates a #${id} userPhone`;
  }

  remove(id: number) {
    return `This action removes a #${id} userPhone`;
  }
}
