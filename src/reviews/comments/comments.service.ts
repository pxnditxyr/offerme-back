import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateCommentInput, UpdateCommentInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { ReviewsService } from '../reviews/reviews.service'
import { User } from 'src/users/users/entities/user.entity'
import { extractPrismaExceptions } from 'src/common/exception-catchers'
import { Comment } from './entities/comment.entity'
import { IFindAllOptions } from 'src/common/interfaces'

const commentIncludes = {
  review: true,
  user: true,
  creator: true,
  updater: true,

}

@Injectable()
export class CommentsService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly reviewsService : ReviewsService
  ) {}

  async create ( createCommentInput : CreateCommentInput, creator : User ) : Promise<Comment> {
    const { reviewId } = createCommentInput
    await this.reviewsService.findOne( reviewId )
    try {
      const comment = await this.prismaService.comments.create({
        data: {
          ...createCommentInput,
          userId: creator.id,
          createdBy: creator.id,
        }
      })
      return comment
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll ( { paginationArgs, searchArgs } : IFindAllOptions ) {
    const { offset, limit } = paginationArgs
    const { search } = searchArgs
    try {
      const comments = await this.prismaService.comments.findMany({
        where: {
          comment: {
            contains: search,
            mode: 'insensitive'
          }
        },
        include: { ...commentIncludes },
        take: limit,
        skip: offset,
      })
      return comments
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findOne ( id : string ) {
    const comment = await this.prismaService.comments.findUnique({
      where: { id },
      include: { ...commentIncludes },
    })
    if ( !comment ) throw new NotFoundException( `Comment with id ${ id } not found` )
    return comment
  }

  async update ( id : string, updateCommentInput : UpdateCommentInput, updater : User ) : Promise<Comment> {
    await this.findOne( id )
    try {
      const comment = await this.prismaService.comments.update({
        where: { id },
        data: {
          ...updateCommentInput,
          updatedBy: updater.id,
        }
      })
      return comment
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) : Promise<Comment> {
    await this.findOne( id )
    try {
      const comment = await this.prismaService.comments.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id,
        }
      })
      return comment
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
