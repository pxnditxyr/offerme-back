import { Injectable } from '@nestjs/common';
import { CreatePromotionPaymentInput } from './dto/create-promotion-payment.input';
import { UpdatePromotionPaymentInput } from './dto/update-promotion-payment.input';

@Injectable()
export class PromotionPaymentsService {
  create(createPromotionPaymentInput: CreatePromotionPaymentInput) {
    return 'This action adds a new promotionPayment';
  }

  findAll() {
    return `This action returns all promotionPayments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} promotionPayment`;
  }

  update(id: number, updatePromotionPaymentInput: UpdatePromotionPaymentInput) {
    return `This action updates a #${id} promotionPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} promotionPayment`;
  }
}
