import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DiscountProductsService } from './discount-products.service';
import { DiscountProduct } from './entities/discount-product.entity';
import { CreateDiscountProductInput } from './dto/create-discount-product.input';
import { UpdateDiscountProductInput } from './dto/update-discount-product.input';

@Resolver(() => DiscountProduct)
export class DiscountProductsResolver {
  constructor(private readonly discountProductsService: DiscountProductsService) {}

  @Mutation(() => DiscountProduct)
  createDiscountProduct(@Args('createDiscountProductInput') createDiscountProductInput: CreateDiscountProductInput) {
    return this.discountProductsService.create(createDiscountProductInput);
  }

  @Query(() => [DiscountProduct], { name: 'discountProducts' })
  findAll() {
    return this.discountProductsService.findAll();
  }

  @Query(() => DiscountProduct, { name: 'discountProduct' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.discountProductsService.findOne(id);
  }

  @Mutation(() => DiscountProduct)
  updateDiscountProduct(@Args('updateDiscountProductInput') updateDiscountProductInput: UpdateDiscountProductInput) {
    return this.discountProductsService.update(updateDiscountProductInput.id, updateDiscountProductInput);
  }

  @Mutation(() => DiscountProduct)
  removeDiscountProduct(@Args('id', { type: () => Int }) id: number) {
    return this.discountProductsService.remove(id);
  }
}
