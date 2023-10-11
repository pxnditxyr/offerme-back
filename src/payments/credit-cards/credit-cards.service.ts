import { Injectable } from '@nestjs/common';
import { CreateCreditCardInput } from './dto/create-credit-card.input';
import { UpdateCreditCardInput } from './dto/update-credit-card.input';

@Injectable()
export class CreditCardsService {
  create(createCreditCardInput: CreateCreditCardInput) {
    return 'This action adds a new creditCard';
  }

  findAll() {
    return `This action returns all creditCards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} creditCard`;
  }

  update(id: number, updateCreditCardInput: UpdateCreditCardInput) {
    return `This action updates a #${id} creditCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} creditCard`;
  }
}
