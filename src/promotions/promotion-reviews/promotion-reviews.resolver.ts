import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PromotionReviewsService } from './promotion-reviews.service';
import { PromotionReview } from './entities/promotion-review.entity';
import { CreatePromotionReviewInput } from './dto/create-promotion-review.input';
import { UpdatePromotionReviewInput } from './dto/update-promotion-review.input';

@Resolver(() => PromotionReview)
export class PromotionReviewsResolver {
  constructor(private readonly promotionReviewsService: PromotionReviewsService) {}

  @Mutation(() => PromotionReview)
  createPromotionReview(@Args('createPromotionReviewInput') createPromotionReviewInput: CreatePromotionReviewInput) {
    return this.promotionReviewsService.create(createPromotionReviewInput);
  }

  @Query(() => [PromotionReview], { name: 'promotionReviews' })
  findAll() {
    return this.promotionReviewsService.findAll();
  }

  @Query(() => PromotionReview, { name: 'promotionReview' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.promotionReviewsService.findOne(id);
  }

  @Mutation(() => PromotionReview)
  updatePromotionReview(@Args('updatePromotionReviewInput') updatePromotionReviewInput: UpdatePromotionReviewInput) {
    return this.promotionReviewsService.update(updatePromotionReviewInput.id, updatePromotionReviewInput);
  }

  @Mutation(() => PromotionReview)
  removePromotionReview(@Args('id', { type: () => Int }) id: number) {
    return this.promotionReviewsService.remove(id);
  }
}
