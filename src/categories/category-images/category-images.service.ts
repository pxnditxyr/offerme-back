import { Injectable } from '@nestjs/common';
import { CreateCategoryImageInput } from './dto/create-category-image.input';
import { UpdateCategoryImageInput } from './dto/update-category-image.input';

@Injectable()
export class CategoryImagesService {
  create(createCategoryImageInput: CreateCategoryImageInput) {
    return 'This action adds a new categoryImage';
  }

  findAll() {
    return `This action returns all categoryImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoryImage`;
  }

  update(id: number, updateCategoryImageInput: UpdateCategoryImageInput) {
    return `This action updates a #${id} categoryImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryImage`;
  }
}
