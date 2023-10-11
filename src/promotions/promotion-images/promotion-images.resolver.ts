import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PromotionImagesService } from './promotion-images.service';
import { PromotionImage } from './entities/promotion-image.entity';
import { CreatePromotionImageInput } from './dto/create-promotion-image.input';
import { UpdatePromotionImageInput } from './dto/update-promotion-image.input';

@Resolver(() => PromotionImage)
export class PromotionImagesResolver {
  constructor(private readonly promotionImagesService: PromotionImagesService) {}

  @Mutation(() => PromotionImage)
  createPromotionImage(@Args('createPromotionImageInput') createPromotionImageInput: CreatePromotionImageInput) {
    return this.promotionImagesService.create(createPromotionImageInput);
  }

  @Query(() => [PromotionImage], { name: 'promotionImages' })
  findAll() {
    return this.promotionImagesService.findAll();
  }

  @Query(() => PromotionImage, { name: 'promotionImage' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.promotionImagesService.findOne(id);
  }

  @Mutation(() => PromotionImage)
  updatePromotionImage(@Args('updatePromotionImageInput') updatePromotionImageInput: UpdatePromotionImageInput) {
    return this.promotionImagesService.update(updatePromotionImageInput.id, updatePromotionImageInput);
  }

  @Mutation(() => PromotionImage)
  removePromotionImage(@Args('id', { type: () => Int }) id: number) {
    return this.promotionImagesService.remove(id);
  }
}
