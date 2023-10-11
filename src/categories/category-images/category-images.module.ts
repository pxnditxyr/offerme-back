import { Module } from '@nestjs/common';
import { CategoryImagesService } from './category-images.service';
import { CategoryImagesResolver } from './category-images.resolver';

@Module({
  providers: [CategoryImagesResolver, CategoryImagesService],
})
export class CategoryImagesModule {}
