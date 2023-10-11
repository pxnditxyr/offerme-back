import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CodePromotionDiscountProductsService } from './code-promotion-discount-products.service';
import { CodePromotionDiscountProduct } from './entities/code-promotion-discount-product.entity';
import { CreateCodePromotionDiscountProductInput } from './dto/create-code-promotion-discount-product.input';
import { UpdateCodePromotionDiscountProductInput } from './dto/update-code-promotion-discount-product.input';

@Resolver(() => CodePromotionDiscountProduct)
export class CodePromotionDiscountProductsResolver {
  constructor(private readonly codePromotionDiscountProductsService: CodePromotionDiscountProductsService) {}

  @Mutation(() => CodePromotionDiscountProduct)
  createCodePromotionDiscountProduct(@Args('createCodePromotionDiscountProductInput') createCodePromotionDiscountProductInput: CreateCodePromotionDiscountProductInput) {
    return this.codePromotionDiscountProductsService.create(createCodePromotionDiscountProductInput);
  }

  @Query(() => [CodePromotionDiscountProduct], { name: 'codePromotionDiscountProducts' })
  findAll() {
    return this.codePromotionDiscountProductsService.findAll();
  }

  @Query(() => CodePromotionDiscountProduct, { name: 'codePromotionDiscountProduct' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.codePromotionDiscountProductsService.findOne(id);
  }

  @Mutation(() => CodePromotionDiscountProduct)
  updateCodePromotionDiscountProduct(@Args('updateCodePromotionDiscountProductInput') updateCodePromotionDiscountProductInput: UpdateCodePromotionDiscountProductInput) {
    return this.codePromotionDiscountProductsService.update(updateCodePromotionDiscountProductInput.id, updateCodePromotionDiscountProductInput);
  }

  @Mutation(() => CodePromotionDiscountProduct)
  removeCodePromotionDiscountProduct(@Args('id', { type: () => Int }) id: number) {
    return this.codePromotionDiscountProductsService.remove(id);
  }
}
