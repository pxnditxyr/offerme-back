import { Injectable } from '@nestjs/common';
import { CreateCompanyCategoryInput } from './dto/create-company-category.input';
import { UpdateCompanyCategoryInput } from './dto/update-company-category.input';

@Injectable()
export class CompanyCategoriesService {
  create(createCompanyCategoryInput: CreateCompanyCategoryInput) {
    return 'This action adds a new companyCategory';
  }

  findAll() {
    return `This action returns all companyCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyCategory`;
  }

  update(id: number, updateCompanyCategoryInput: UpdateCompanyCategoryInput) {
    return `This action updates a #${id} companyCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyCategory`;
  }
}
