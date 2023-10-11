import { Injectable } from '@nestjs/common';
import { CreateCodePromotionDiscountProductInput } from './dto/create-code-promotion-discount-product.input';
import { UpdateCodePromotionDiscountProductInput } from './dto/update-code-promotion-discount-product.input';

@Injectable()
export class CodePromotionDiscountProductsService {
  create(createCodePromotionDiscountProductInput: CreateCodePromotionDiscountProductInput) {
    return 'This action adds a new codePromotionDiscountProduct';
  }

  findAll() {
    return `This action returns all codePromotionDiscountProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} codePromotionDiscountProduct`;
  }

  update(id: number, updateCodePromotionDiscountProductInput: UpdateCodePromotionDiscountProductInput) {
    return `This action updates a #${id} codePromotionDiscountProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} codePromotionDiscountProduct`;
  }
}
