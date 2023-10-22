import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateCategoryImageInput, UpdateCategoryImageInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { User } from 'src/users/users/entities/user.entity'
import { CategoryImage } from './entities/category-image.entity'
import { CategoriesService } from '../categories/categories.service'

const categoryImageIncludes = {
  creator: true,
  updater: true,
  category: true
}

@Injectable()
export class CategoryImagesService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly categoriesService : CategoriesService
  ) {}

  async create ( createCategoryImageInput : CreateCategoryImageInput, creator : User ) : Promise<CategoryImage> {
    const { categoryId } = createCategoryImageInput
    await this.categoriesService.findOne( categoryId )
    try {
      await this.changeMainImage( categoryId, creator )
      const categoryImage = await this.prismaService.categoryImages.create({
        data: {
          ...createCategoryImageInput,
          createdBy: creator.id
        }
      })
      return categoryImage
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () {
    const categoryImages = await this.prismaService.categoryImages.findMany({
      include: { ...categoryImageIncludes }
    })
    return categoryImages
  }

  async findOne ( id : string ) {
    const categoryImage = await this.prismaService.categoryImages.findUnique({
      where: { id },
      include: { ...categoryImageIncludes }
    })
    if ( !categoryImage ) throw new NotFoundException( `Category image with ID ${ id } not found` )
    return categoryImage
  }

  async findMainImage ( categoryId : string ) {
    const categoryImage = await this.prismaService.categoryImages.findFirst({
      where: {
        categoryId,
        isMain: true
      },
      include: { ...categoryImageIncludes }
    })
    return categoryImage
  }

  private async changeMainImage ( categoryId : string, updater : User ) : Promise<CategoryImage | null> {
    const mainImage = await this.findMainImage( categoryId )
    if ( !mainImage ) return null
    try {
      const categoryImage = await this.prismaService.categoryImages.update({
        where: { id: mainImage.id },
        data: {
          isMain: false,
          updatedBy: updater.id
        }
      })
      return categoryImage
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async update( id : string, updateCategoryImageInput : UpdateCategoryImageInput, updater : User ) : Promise<CategoryImage> {
    await this.findOne( id )
    const { categoryId } = updateCategoryImageInput
    if ( categoryId ) await this.categoriesService.findOne( categoryId )
    try {
      const categoryImage = await this.prismaService.categoryImages.update({
        where: { id },
        data: {
          ...updateCategoryImageInput,
          updatedBy: updater.id
        }
      })
      return categoryImage
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) : Promise<CategoryImage> {
    await this.findOne( id )
    try {
      const categoryImage = await this.prismaService.categoryImages.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id
        }
      })
      return categoryImage
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
