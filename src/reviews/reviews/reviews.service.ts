import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common'
import { CreateReviewInput, UpdateReviewInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { User } from 'src/users/users/entities/user.entity'
import { Review } from './entities/review.entity'
import { extractPrismaExceptions } from 'src/common/exception-catchers'

@Injectable()
export class ReviewsService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService
  ) {}

  async create( createReviewInput : CreateReviewInput, creator : User ) : Promise<Review> {
    try {
      const review = await this.prismaService.reviews.create({
        data: {
          ...createReviewInput,
          userId: creator.id,
          createdBy: creator.id,
        }
      })
      return review
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () {
    try {
      const reviews = await this.prismaService.reviews.findMany()
      return reviews
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findOne ( id : string ) {
    try {
      const review = await this.prismaService.reviews.findUnique({
        where: { id }
      })
      return review
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async update ( id : string, updateReviewInput : UpdateReviewInput, updater : User ) : Promise<Review> {
    await this.findOne( id )
    try {
      const review = await this.prismaService.reviews.update({
        where: { id },
        data: {
          ...updateReviewInput,
          updatedBy: updater.id,
        }
      })
      return review
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) : Promise<Review> {
    await this.findOne( id )
    try {
      const review = await this.prismaService.reviews.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id,
        }
      })
      return review
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
