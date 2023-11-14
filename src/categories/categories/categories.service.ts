import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateCategoryInput, UpdateCategoryInput } from './dto/inputs'
import { Category } from './entities/category.entity'
import { User } from 'src/users/users/entities/user.entity'
import { PrismaService } from 'src/prisma'
import { IFindAllOptions } from 'src/common/interfaces/find-options.interface'
import { extractPrismaExceptions } from 'src/common/exception-catchers'

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

  async create ( createCategoryInput : CreateCategoryInput, creator : User ) : Promise<Category> {
    const { parentId } = createCategoryInput
    if ( parentId ) await this.findOne( parentId )
    try {
      const category = await this.prismaService.categories.create({
        data: {
          ...createCategoryInput,
          createdBy: creator.id,
        },
      })
      return category
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll ( { paginationArgs, searchArgs } : IFindAllOptions  ) {
    try {
      const { limit, offset } = paginationArgs
      const { search, status } = searchArgs
      const categories = await this.prismaService.categories.findMany({
        include: { ...categoryIncludes },
        where: {
          OR: [
            { name: { contains: search || '', mode: 'insensitive' } },
            { description: { contains: search || '', mode: 'insensitive' } }
          ],
          status: status ?? undefined
        },
        take: limit ?? undefined,
        skip: offset ?? undefined,
        orderBy: { updatedAt: 'desc' }
      })
      return categories
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
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

  async toggleStatus ( id : string, updater : User ) : Promise<Category> {
    const currentCategory = await this.findOne( id )
    try {
      const category = await this.prismaService.categories.update({
        where: { id },
        data: {
          status: !currentCategory.status,
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
    const prismaError = extractPrismaExceptions( error )
    if ( prismaError ) throw new BadRequestException( prismaError )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
