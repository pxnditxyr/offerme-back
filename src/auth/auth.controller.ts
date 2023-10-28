import { Body, Controller, Ip, Post, Req } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SigninDto, SignupDto } from './dto'

@Controller( 'auth' )
export class AuthController {
  constructor (
    private readonly authService : AuthService
  ) {}

  @Post( 'signup' )
  async signup (
    @Req() request : Request,
    @Body() signupDto : SignupDto,
    @Ip() ip : string
  ) {
    return await this.authService.signup( signupDto, request, ip )
  }

  @Post( 'signin' )
  async signin (
    @Req() request : Request,
    @Body() signinDto : SigninDto,
    @Ip() ip : string
  ) {
    return await this.authService.signin( signinDto, request, ip )
  }
}
