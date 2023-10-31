import { BadRequestException, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResponse } from './types/auth-response.types'
import { Query, Resolver } from '@nestjs/graphql'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { CurrentUser } from './decorators/current-user.decorator'
import { User } from '../users/users/entities/user.entity'
import { GenderResponse } from './types'

@Resolver()
export class AuthResolver {
  constructor (
    private readonly authService : AuthService
  ) {}

  @Query( () => AuthResponse, { name: 'revalidateToken' } )
  @UseGuards( JwtAuthGuard )
  revalidateToken (
    @CurrentUser() user : User
  ) : AuthResponse {
    return this.authService.revalidateToken( user )
  }

  @Query( () => [ GenderResponse ], { name: 'genders' } )
  async findAllGenders () {
    return this.authService.findAllGenders()
  }
}
