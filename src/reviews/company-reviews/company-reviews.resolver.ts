import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { CompanyReviewsService } from './company-reviews.service'
import { CompanyReview } from './entities/company-review.entity'
import { CreateCompanyReviewInput, UpdateCompanyReviewInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'

@UseGuards( JwtAuthGuard )
@Resolver( () => CompanyReview )
export class CompanyReviewsResolver {
  constructor (
    private readonly companyReviewsService: CompanyReviewsService
  ) {}

  @Mutation( () => CompanyReview )
  async createCompanyReview (
    @Args( 'createCompanyReviewInput' ) createCompanyReviewInput : CreateCompanyReviewInput,
    @CurrentUser([ ValidRoles.USER ]) creator : User
  ) : Promise<CompanyReview>  {
    return await this.companyReviewsService.create( createCompanyReviewInput, creator )
  }

  @Query( () => [ CompanyReview ], { name: 'companyReviews' } )
  async findAll(
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs,
  ) {
    return await this.companyReviewsService.findAll({ paginationArgs, searchArgs })
  }

  @Query( () => CompanyReview, { name: 'companyReview' } )
  async findOne(
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string
  ) {
    return this.companyReviewsService.findOne( id )
  }

  @Mutation( () => CompanyReview )
  async updateCompanyReview (
    @Args( 'updateCompanyReviewInput' ) updateCompanyReviewInput : UpdateCompanyReviewInput,
    @CurrentUser([ ValidRoles.USER ]) updater : User
  ) : Promise<CompanyReview> {
    return await this.companyReviewsService.update( updateCompanyReviewInput.id, updateCompanyReviewInput, updater )
  }

  @Mutation( () => CompanyReview )
  async deactivateCompanyReview (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.USER, ValidRoles.ADMIN ]) updater : User
  ) : Promise<CompanyReview> {
    return await this.companyReviewsService.deactivate( id, updater )
  }
}
