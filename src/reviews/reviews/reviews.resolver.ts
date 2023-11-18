import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql'
import { ReviewsService } from './reviews.service'
import { Review } from './entities/review.entity'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { User } from 'src/users/users/entities/user.entity'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'

@UseGuards( JwtAuthGuard )
@Resolver( () => Review )
export class ReviewsResolver {
  constructor (
    private readonly reviewsService: ReviewsService,
  ) {}

  @Query( () => [ Review ], { name: 'reviews' } )
  async findAll (
    @CurrentUser([ ValidRoles.ADMIN, ValidRoles.COMPANY_REPRESENTATIVE ]) _user : User
  ) {
    return await this.reviewsService.findAll()
  }

  @Query( () => Review, { name: 'review' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe  ) id : string
  ) {
    return await this.reviewsService.findOne( id )
  }

  @Mutation( () => Review )
  async toggleStatusReview (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.ADMIN ]) user : User
  ) : Promise<Review> {
    return this.reviewsService.toggleStatus( id, user )
  }
}
