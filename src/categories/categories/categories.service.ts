import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateCategoryInput, UpdateCategoryInput } from './dto/inputs'
import { Category } from './entities/category.entity'
import { User } from 'src/users/users/entities/user.entity'
import { PrismaService } from 'src/prisma'

const categoryIncludes = {
  images: true,
  parent: true,
  creator: true,
  updater: true,
  children: true,
  products: true,
  companies: true
}

@Injectable()
export class CategoriesService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService
  ) {}

  async create ( createCategoryInput : CreateCategoryInput, user : User ) : Promise<Category> {
    const { parentId } = createCategoryInput
    if ( parentId ) await this.findOne( parentId )
    try {
      const category = await this.prismaService.categories.create({
        data: {
          ...createCategoryInput,
          createdBy: user.id,
        },
      })
      return category
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }

  }

  async findAll () {
    const categories = await this.prismaService.categories.findMany({
      include: { ...categoryIncludes }
    })

    return categories
  }

  async findOne ( id : string ) {
    const category = await this.prismaService.categories.findUnique({
      where: { id },
      include: { ...categoryIncludes }
    })

    if ( !category ) throw new NotFoundException( `Category with id ${ id } not found` )

    return category
  }

  async update( id : string, updateCategoryInput : UpdateCategoryInput, updater : User ) : Promise<Category> {
    await this.findOne( id )
    try {
      const category = await this.prismaService.categories.update({
        where: { id },
        data: {
          ...updateCategoryInput,
          updatedBy: updater.id
        }
      })
      return category
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) : Promise<Category> {
    await this.findOne( id )
    try {
      const category = await this.prismaService.categories.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id
        }
      })
      return category
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
