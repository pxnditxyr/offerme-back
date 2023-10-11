import { Injectable } from '@nestjs/common';
import { CreateUserCreditCardInput } from './dto/create-user-credit-card.input';
import { UpdateUserCreditCardInput } from './dto/update-user-credit-card.input';

@Injectable()
export class UserCreditCardsService {
  create(createUserCreditCardInput: CreateUserCreditCardInput) {
    return 'This action adds a new userCreditCard';
  }

  findAll() {
    return `This action returns all userCreditCards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userCreditCard`;
  }

  update(id: number, updateUserCreditCardInput: UpdateUserCreditCardInput) {
    return `This action updates a #${id} userCreditCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} userCreditCard`;
  }
}
