import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PromotionStatusService } from './promotion-status.service';
import { PromotionStatus } from './entities/promotion-status.entity';
import { CreatePromotionStatusInput } from './dto/create-promotion-status.input';
import { UpdatePromotionStatusInput } from './dto/update-promotion-status.input';

@Resolver(() => PromotionStatus)
export class PromotionStatusResolver {
  constructor(private readonly promotionStatusService: PromotionStatusService) {}

  @Mutation(() => PromotionStatus)
  createPromotionStatus(@Args('createPromotionStatusInput') createPromotionStatusInput: CreatePromotionStatusInput) {
    return this.promotionStatusService.create(createPromotionStatusInput);
  }

  @Query(() => [PromotionStatus], { name: 'promotionStatus' })
  findAll() {
    return this.promotionStatusService.findAll();
  }

  @Query(() => PromotionStatus, { name: 'promotionStatus' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.promotionStatusService.findOne(id);
  }

  @Mutation(() => PromotionStatus)
  updatePromotionStatus(@Args('updatePromotionStatusInput') updatePromotionStatusInput: UpdatePromotionStatusInput) {
    return this.promotionStatusService.update(updatePromotionStatusInput.id, updatePromotionStatusInput);
  }

  @Mutation(() => PromotionStatus)
  removePromotionStatus(@Args('id', { type: () => Int }) id: number) {
    return this.promotionStatusService.remove(id);
  }
}
