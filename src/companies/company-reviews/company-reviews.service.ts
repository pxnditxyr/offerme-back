import { Injectable } from '@nestjs/common';
import { CreateCompanyReviewInput } from './dto/create-company-review.input';
import { UpdateCompanyReviewInput } from './dto/update-company-review.input';

@Injectable()
export class CompanyReviewsService {
  create(createCompanyReviewInput: CreateCompanyReviewInput) {
    return 'This action adds a new companyReview';
  }

  findAll() {
    return `This action returns all companyReviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyReview`;
  }

  update(id: number, updateCompanyReviewInput: UpdateCompanyReviewInput) {
    return `This action updates a #${id} companyReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyReview`;
  }
}
