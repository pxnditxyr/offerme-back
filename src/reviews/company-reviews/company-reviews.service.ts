import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateCompanyReviewInput, UpdateCompanyReviewInput } from './dto/inputs'
import { User } from 'src/users/users/entities/user.entity'
import { extractPrismaExceptions } from 'src/common/exception-catchers'
import { PrismaService } from 'src/prisma'
import { CompanyReview } from './entities/company-review.entity'
import { CompaniesService } from 'src/companies/companies/companies.service'
import { ReviewsService } from '../reviews/reviews.service'
import { IFindAllOptions } from 'src/common/interfaces'

const companyReviewIncludes = {
  review: true,
  company: true,
  creator: true,
  updater: true,
}

@Injectable()
export class CompanyReviewsService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly companiesService : CompaniesService,
    private readonly reviewsService : ReviewsService,
  ) {}
  
  async create ( createCompanyReviewInput : CreateCompanyReviewInput, creator : User ) : Promise<CompanyReview> {
    const { companyId, ...reviewData } = createCompanyReviewInput
    await this.companiesService.findOne( companyId )
    const review = await this.reviewsService.create( reviewData, creator )
    try {
      const companyReview = await this.prismaService.companyReviews.create({
        data: {
          reviewId: review.id,
          companyId,
          createdBy: creator.id,
        }
      })
      return companyReview
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll ( { paginationArgs, searchArgs } : IFindAllOptions ) {
    const { limit, offset } = paginationArgs
    const { search } = searchArgs
    try {
      const companyReviews = await this.prismaService.companyReviews.findMany({
        include: { ...companyReviewIncludes },
        where: {
          review: {
            review: {
              contains: search,
            }
          }
        },
        take: limit,
        skip: offset,
      })
      return companyReviews
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findOne ( id : string ) {
    try {
      const companyReview = await this.prismaService.companyReviews.findUnique({
        where: { id },
        include: { ...companyReviewIncludes },
      })
      if ( !companyReview ) throw new NotFoundException( `Company Review with ID ${ id } not found` )
      return companyReview
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }

  }

  async update ( id : string, updateCompanyReviewInput  : UpdateCompanyReviewInput, updater : User ) : Promise<CompanyReview> {
    const companyReview = await this.findOne( id )
    try {
      const { review } = updateCompanyReviewInput
      await this.reviewsService.update( companyReview.reviewId, { id: companyReview.reviewId, review }, updater )
      return await this.findOne( id )
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) : Promise<CompanyReview> {
    await this.findOne( id )
    try {
      const companyReview = await this.prismaService.companyReviews.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id,
        }
      })
      return companyReview
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
