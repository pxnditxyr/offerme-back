import { Injectable } from '@nestjs/common';
import { CreatePromotionTargetProductInput } from './dto/create-promotion-target-product.input';
import { UpdatePromotionTargetProductInput } from './dto/update-promotion-target-product.input';

@Injectable()
export class PromotionTargetProductsService {
  create(createPromotionTargetProductInput: CreatePromotionTargetProductInput) {
    return 'This action adds a new promotionTargetProduct';
  }

  findAll() {
    return `This action returns all promotionTargetProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} promotionTargetProduct`;
  }

  update(id: number, updatePromotionTargetProductInput: UpdatePromotionTargetProductInput) {
    return `This action updates a #${id} promotionTargetProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} promotionTargetProduct`;
  }
}
