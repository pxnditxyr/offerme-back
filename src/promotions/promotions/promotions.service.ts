import { Injectable } from '@nestjs/common';
import { CreatePromotionInput } from './dto/create-promotion.input';
import { UpdatePromotionInput } from './dto/update-promotion.input';

@Injectable()
export class PromotionsService {
  create(createPromotionInput: CreatePromotionInput) {
    return 'This action adds a new promotion';
  }

  findAll() {
    return `This action returns all promotions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} promotion`;
  }

  update(id: number, updatePromotionInput: UpdatePromotionInput) {
    return `This action updates a #${id} promotion`;
  }

  remove(id: number) {
    return `This action removes a #${id} promotion`;
  }
}
