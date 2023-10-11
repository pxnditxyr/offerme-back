import { Injectable } from '@nestjs/common';
import { CreateDiscountProductInput } from './dto/create-discount-product.input';
import { UpdateDiscountProductInput } from './dto/update-discount-product.input';

@Injectable()
export class DiscountProductsService {
  create(createDiscountProductInput: CreateDiscountProductInput) {
    return 'This action adds a new discountProduct';
  }

  findAll() {
    return `This action returns all discountProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} discountProduct`;
  }

  update(id: number, updateDiscountProductInput: UpdateDiscountProductInput) {
    return `This action updates a #${id} discountProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} discountProduct`;
  }
}
