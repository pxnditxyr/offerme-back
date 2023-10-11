import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompanyReviewsService } from './company-reviews.service';
import { CompanyReview } from './entities/company-review.entity';
import { CreateCompanyReviewInput } from './dto/create-company-review.input';
import { UpdateCompanyReviewInput } from './dto/update-company-review.input';

@Resolver(() => CompanyReview)
export class CompanyReviewsResolver {
  constructor(private readonly companyReviewsService: CompanyReviewsService) {}

  @Mutation(() => CompanyReview)
  createCompanyReview(@Args('createCompanyReviewInput') createCompanyReviewInput: CreateCompanyReviewInput) {
    return this.companyReviewsService.create(createCompanyReviewInput);
  }

  @Query(() => [CompanyReview], { name: 'companyReviews' })
  findAll() {
    return this.companyReviewsService.findAll();
  }

  @Query(() => CompanyReview, { name: 'companyReview' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.companyReviewsService.findOne(id);
  }

  @Mutation(() => CompanyReview)
  updateCompanyReview(@Args('updateCompanyReviewInput') updateCompanyReviewInput: UpdateCompanyReviewInput) {
    return this.companyReviewsService.update(updateCompanyReviewInput.id, updateCompanyReviewInput);
  }

  @Mutation(() => CompanyReview)
  removeCompanyReview(@Args('id', { type: () => Int }) id: number) {
    return this.companyReviewsService.remove(id);
  }
}
