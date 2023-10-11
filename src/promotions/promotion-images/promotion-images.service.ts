import { Injectable } from '@nestjs/common';
import { CreatePromotionImageInput } from './dto/create-promotion-image.input';
import { UpdatePromotionImageInput } from './dto/update-promotion-image.input';

@Injectable()
export class PromotionImagesService {
  create(createPromotionImageInput: CreatePromotionImageInput) {
    return 'This action adds a new promotionImage';
  }

  findAll() {
    return `This action returns all promotionImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} promotionImage`;
  }

  update(id: number, updatePromotionImageInput: UpdatePromotionImageInput) {
    return `This action updates a #${id} promotionImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} promotionImage`;
  }
}
