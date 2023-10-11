import { Injectable } from '@nestjs/common';
import { CreatePromotionStatusInput } from './dto/create-promotion-status.input';
import { UpdatePromotionStatusInput } from './dto/update-promotion-status.input';

@Injectable()
export class PromotionStatusService {
  create(createPromotionStatusInput: CreatePromotionStatusInput) {
    return 'This action adds a new promotionStatus';
  }

  findAll() {
    return `This action returns all promotionStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} promotionStatus`;
  }

  update(id: number, updatePromotionStatusInput: UpdatePromotionStatusInput) {
    return `This action updates a #${id} promotionStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} promotionStatus`;
  }
}
