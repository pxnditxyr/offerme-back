import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PromotionPaymentsService } from './promotion-payments.service';
import { PromotionPayment } from './entities/promotion-payment.entity';
import { CreatePromotionPaymentInput } from './dto/create-promotion-payment.input';
import { UpdatePromotionPaymentInput } from './dto/update-promotion-payment.input';

@Resolver(() => PromotionPayment)
export class PromotionPaymentsResolver {
  constructor(private readonly promotionPaymentsService: PromotionPaymentsService) {}

  @Mutation(() => PromotionPayment)
  createPromotionPayment(@Args('createPromotionPaymentInput') createPromotionPaymentInput: CreatePromotionPaymentInput) {
    return this.promotionPaymentsService.create(createPromotionPaymentInput);
  }

  @Query(() => [PromotionPayment], { name: 'promotionPayments' })
  findAll() {
    return this.promotionPaymentsService.findAll();
  }

  @Query(() => PromotionPayment, { name: 'promotionPayment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.promotionPaymentsService.findOne(id);
  }

  @Mutation(() => PromotionPayment)
  updatePromotionPayment(@Args('updatePromotionPaymentInput') updatePromotionPaymentInput: UpdatePromotionPaymentInput) {
    return this.promotionPaymentsService.update(updatePromotionPaymentInput.id, updatePromotionPaymentInput);
  }

  @Mutation(() => PromotionPayment)
  removePromotionPayment(@Args('id', { type: () => Int }) id: number) {
    return this.promotionPaymentsService.remove(id);
  }
}
