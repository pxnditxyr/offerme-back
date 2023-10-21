import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreatePromotionReviewInput, UpdatePromotionReviewInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { ReviewsService } from '../reviews/reviews.service'
import { PromotionsService } from 'src/promotions/promotions/promotions.service'
import { User } from 'src/users/users/entities/user.entity'
import { extractPrismaExceptions } from 'src/common/exception-catchers'
import { IFindAllOptions } from 'src/common/interfaces'
import { PromotionReview } from './entities/promotion-review.entity'

const promotionReviewIncludes = {
  review: true,
  promotion: true,
  creator: true,
  updater: true,
}

@Injectable()
export class PromotionReviewsService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly reviewsService : ReviewsService,
    private readonly promotionsService : PromotionsService,

  ) {}

  async create ( createPromotionReviewInput : CreatePromotionReviewInput, creator : User ) : Promise<PromotionReview> {
    const { promotionId, ...reviewData } = createPromotionReviewInput
    // TODO: Check if promotion exists
    // await this.promotionsService.findOne( promotionId )
    const review = await this.reviewsService.create( reviewData, creator )
    try {
      const promotionReview = await this.prismaService.promotionReviews.create({
        data: {
          promotionId,
          reviewId: review.id,
          createdBy: creator.id,
        }
      })
      return promotionReview
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll ( { paginationArgs, searchArgs } : IFindAllOptions ) {

    const { limit, offset } = paginationArgs
    const { search } = searchArgs

    try {
      const promotionReviews = await this.prismaService.promotionReviews.findMany({
        where: {
          review: {
            review: { contains: search }
          }
        },
        include: { ...promotionReviewIncludes },
        take: limit,
        skip: offset,
      })
      return promotionReviews
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findOne ( id : string ) {
    const promotionReview = await this.prismaService.promotionReviews.findUnique({
      where: { id },
      include: { ...promotionReviewIncludes }
    })
    if ( !promotionReview ) throw new NotFoundException( `PromotionReview with ID ${ id } not found` )
    return promotionReview
  }

  async update( id : string, updatePromotionReviewInput : UpdatePromotionReviewInput, updater : User ) : Promise<PromotionReview> {
    const promotionReview= await this.findOne( id )
    const { review } = updatePromotionReviewInput
    await this.reviewsService.update( promotionReview.id, { id: promotionReview.id, review }, updater )
    try {
      return await this.findOne( id )
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) : Promise<PromotionReview> {
    await this.findOne( id )
    try {
      const promotionReview = await this.prismaService.promotionReviews.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id,
        }
      })
      return promotionReview
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    const prismaErrors = extractPrismaExceptions( error )
    if ( prismaErrors ) throw new BadRequestException( prismaErrors )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
