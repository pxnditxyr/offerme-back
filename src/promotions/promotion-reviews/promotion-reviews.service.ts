import { Injectable } from '@nestjs/common';
import { CreatePromotionReviewInput } from './dto/create-promotion-review.input';
import { UpdatePromotionReviewInput } from './dto/update-promotion-review.input';

@Injectable()
export class PromotionReviewsService {
  create(createPromotionReviewInput: CreatePromotionReviewInput) {
    return 'This action adds a new promotionReview';
  }

  findAll() {
    return `This action returns all promotionReviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} promotionReview`;
  }

  update(id: number, updatePromotionReviewInput: UpdatePromotionReviewInput) {
    return `This action updates a #${id} promotionReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} promotionReview`;
  }
}
