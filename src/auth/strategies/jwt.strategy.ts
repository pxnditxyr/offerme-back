import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from '../../users/users/entities/user.entity'
import { IJwtPayload } from '../interfaces/jwt-payload.interface'
import { AuthService } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

  constructor (
    private readonly authService : AuthService,
    configService : ConfigService
  ) {
    super({
      secretOrKey: configService.get<string>( 'JWT_SECRET' ),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate ( payload : IJwtPayload ) : Promise<User> {
    const { id } = payload
    const user = await this.authService.validateUser( id )
    return user
  }
}
