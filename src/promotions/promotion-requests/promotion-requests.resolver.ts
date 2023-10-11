import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PromotionRequestsService } from './promotion-requests.service';
import { PromotionRequest } from './entities/promotion-request.entity';
import { CreatePromotionRequestInput } from './dto/create-promotion-request.input';
import { UpdatePromotionRequestInput } from './dto/update-promotion-request.input';

@Resolver(() => PromotionRequest)
export class PromotionRequestsResolver {
  constructor(private readonly promotionRequestsService: PromotionRequestsService) {}

  @Mutation(() => PromotionRequest)
  createPromotionRequest(@Args('createPromotionRequestInput') createPromotionRequestInput: CreatePromotionRequestInput) {
    return this.promotionRequestsService.create(createPromotionRequestInput);
  }

  @Query(() => [PromotionRequest], { name: 'promotionRequests' })
  findAll() {
    return this.promotionRequestsService.findAll();
  }

  @Query(() => PromotionRequest, { name: 'promotionRequest' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.promotionRequestsService.findOne(id);
  }

  @Mutation(() => PromotionRequest)
  updatePromotionRequest(@Args('updatePromotionRequestInput') updatePromotionRequestInput: UpdatePromotionRequestInput) {
    return this.promotionRequestsService.update(updatePromotionRequestInput.id, updatePromotionRequestInput);
  }

  @Mutation(() => PromotionRequest)
  removePromotionRequest(@Args('id', { type: () => Int }) id: number) {
    return this.promotionRequestsService.remove(id);
  }
}
