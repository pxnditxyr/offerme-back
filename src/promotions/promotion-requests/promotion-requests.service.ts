import { Injectable } from '@nestjs/common';
import { CreatePromotionRequestInput } from './dto/create-promotion-request.input';
import { UpdatePromotionRequestInput } from './dto/update-promotion-request.input';

@Injectable()
export class PromotionRequestsService {
  create(createPromotionRequestInput: CreatePromotionRequestInput) {
    return 'This action adds a new promotionRequest';
  }

  findAll() {
    return `This action returns all promotionRequests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} promotionRequest`;
  }

  update(id: number, updatePromotionRequestInput: UpdatePromotionRequestInput) {
    return `This action updates a #${id} promotionRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} promotionRequest`;
  }
}
