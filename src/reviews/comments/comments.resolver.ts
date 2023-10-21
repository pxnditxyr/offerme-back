import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { CommentsService } from './comments.service'
import { Comment } from './entities/comment.entity'
import { CreateCommentInput, UpdateCommentInput } from './dto/inputs'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'

@UseGuards( JwtAuthGuard )
@Resolver( () => Comment )
export class CommentsResolver {
  constructor (
    private readonly commentsService: CommentsService
  ) {}

  @Mutation( () => Comment )
  async createComment (
    @Args( 'createCommentInput' ) createCommentInput : CreateCommentInput,
    @CurrentUser([ ValidRoles.USER ]) creator : User
  ) : Promise<Comment> {
    return await this.commentsService.create( createCommentInput, creator )
  }

  @Query( () => [ Comment ], { name: 'comments' } )
  async findAll (
    @Args() paginationArgs : PaginationArgs,
    @Args() searchArgs : SearchArgs
  ) {
    return await this.commentsService.findAll({ paginationArgs, searchArgs })
  }

  @Query( () => Comment, { name: 'comment' } )
  async findOne (
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
  ) {
    return await this.commentsService.findOne( id )
  }

  @Mutation( () => Comment )
  async updateComment (
    @Args( 'updateCommentInput' ) updateCommentInput : UpdateCommentInput,
    @CurrentUser([ ValidRoles.USER ]) updater : User
  ) : Promise<Comment> {
    return await this.commentsService.update( updateCommentInput.id, updateCommentInput, updater )
  }

  @Mutation( () => Comment )
  async removeComment(
    @Args( 'id', { type: () => ID }, ParseUUIDPipe ) id : string,
    @CurrentUser([ ValidRoles.USER ]) updater : User
  ) {
    return await this.commentsService.deactivate( id, updater )
  }
}
