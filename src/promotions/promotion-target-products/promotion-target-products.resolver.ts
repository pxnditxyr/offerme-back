import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PromotionTargetProductsService } from './promotion-target-products.service';
import { PromotionTargetProduct } from './entities/promotion-target-product.entity';
import { CreatePromotionTargetProductInput } from './dto/create-promotion-target-product.input';
import { UpdatePromotionTargetProductInput } from './dto/update-promotion-target-product.input';

@Resolver(() => PromotionTargetProduct)
export class PromotionTargetProductsResolver {
  constructor(private readonly promotionTargetProductsService: PromotionTargetProductsService) {}

  @Mutation(() => PromotionTargetProduct)
  createPromotionTargetProduct(@Args('createPromotionTargetProductInput') createPromotionTargetProductInput: CreatePromotionTargetProductInput) {
    return this.promotionTargetProductsService.create(createPromotionTargetProductInput);
  }

  @Query(() => [PromotionTargetProduct], { name: 'promotionTargetProducts' })
  findAll() {
    return this.promotionTargetProductsService.findAll();
  }

  @Query(() => PromotionTargetProduct, { name: 'promotionTargetProduct' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.promotionTargetProductsService.findOne(id);
  }

  @Mutation(() => PromotionTargetProduct)
  updatePromotionTargetProduct(@Args('updatePromotionTargetProductInput') updatePromotionTargetProductInput: UpdatePromotionTargetProductInput) {
    return this.promotionTargetProductsService.update(updatePromotionTargetProductInput.id, updatePromotionTargetProductInput);
  }

  @Mutation(() => PromotionTargetProduct)
  removePromotionTargetProduct(@Args('id', { type: () => Int }) id: number) {
    return this.promotionTargetProductsService.remove(id);
  }
}
