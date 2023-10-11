import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryImagesService } from './category-images.service';
import { CategoryImage } from './entities/category-image.entity';
import { CreateCategoryImageInput } from './dto/create-category-image.input';
import { UpdateCategoryImageInput } from './dto/update-category-image.input';

@Resolver(() => CategoryImage)
export class CategoryImagesResolver {
  constructor(private readonly categoryImagesService: CategoryImagesService) {}

  @Mutation(() => CategoryImage)
  createCategoryImage(@Args('createCategoryImageInput') createCategoryImageInput: CreateCategoryImageInput) {
    return this.categoryImagesService.create(createCategoryImageInput);
  }

  @Query(() => [CategoryImage], { name: 'categoryImages' })
  findAll() {
    return this.categoryImagesService.findAll();
  }

  @Query(() => CategoryImage, { name: 'categoryImage' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoryImagesService.findOne(id);
  }

  @Mutation(() => CategoryImage)
  updateCategoryImage(@Args('updateCategoryImageInput') updateCategoryImageInput: UpdateCategoryImageInput) {
    return this.categoryImagesService.update(updateCategoryImageInput.id, updateCategoryImageInput);
  }

  @Mutation(() => CategoryImage)
  removeCategoryImage(@Args('id', { type: () => Int }) id: number) {
    return this.categoryImagesService.remove(id);
  }
}
