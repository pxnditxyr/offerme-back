import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PromotionsService } from './promotions.service';
import { Promotion } from './entities/promotion.entity';
import { CreatePromotionInput } from './dto/create-promotion.input';
import { UpdatePromotionInput } from './dto/update-promotion.input';

@Resolver(() => Promotion)
export class PromotionsResolver {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Mutation(() => Promotion)
  createPromotion(@Args('createPromotionInput') createPromotionInput: CreatePromotionInput) {
    return this.promotionsService.create(createPromotionInput);
  }

  @Query(() => [Promotion], { name: 'promotions' })
  findAll() {
    return this.promotionsService.findAll();
  }

  @Query(() => Promotion, { name: 'promotion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.promotionsService.findOne(id);
  }

  @Mutation(() => Promotion)
  updatePromotion(@Args('updatePromotionInput') updatePromotionInput: UpdatePromotionInput) {
    return this.promotionsService.update(updatePromotionInput.id, updatePromotionInput);
  }

  @Mutation(() => Promotion)
  removePromotion(@Args('id', { type: () => Int }) id: number) {
    return this.promotionsService.remove(id);
  }
}
