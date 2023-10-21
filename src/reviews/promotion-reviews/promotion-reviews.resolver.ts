import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { PromotionReviewsService } from './promotion-reviews.service'
import { PromotionReview } from './entities/promotion-review.entity'
import { CreatePromotionReviewInput, UpdatePromotionReviewInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'


@UseGuards( JwtAuthGuard )
@Resolver( () => PromotionReview )
export class PromotionReviewsResolver {
  constructor (
    private readonly promotionReviewsService: PromotionReviewsService
  ) {}

  @Mutation( () => PromotionReview )
  async createPromotionReview (
    @Args('createPromotionReviewInput') createPromotionReviewInput: CreatePromotionReviewInput,
    @CurrentUser([ ValidRoles.USER ]) creator : User
  ) : Promise<PromotionReview> {
    return await this.promotionReviewsService.create( createPromotionReviewInput, creator )
  }

  @Query( () => [ PromotionReview ], { name: 'promotionReviews' } )
  async findAll (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs
  ) {
    return await this.promotionReviewsService.findAll({ paginationArgs, searchArgs })
  }

  @Query( () => PromotionReview, { name: 'promotionReview' } )
  async findOne( @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string ) {
    return await this.promotionReviewsService.findOne( id )
  }

  @Mutation( () => PromotionReview )
  async updatePromotionReview (
    @Args( 'updatePromotionReviewInput' ) updatePromotionReviewInput : UpdatePromotionReviewInput,
    @CurrentUser([ ValidRoles.USER ]) updater : User
  ) : Promise<PromotionReview> {
    return await this.promotionReviewsService.update( updatePromotionReviewInput.id, updatePromotionReviewInput, updater )
  }

  @Mutation( () => PromotionReview )
  async removePromotionReview (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.USER ]) updater : User
  ) {
    return await this.promotionReviewsService.deactivate( id, updater )
  }
}
