import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PeopleInfoModule, RolesModule, SessionsModule, UsersModule } from '../users'
import { SubparametersModule } from '../parametrics'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthResolver } from './auth.resolver'

@Module({
  controllers: [ AuthController ],
  providers: [ AuthResolver, AuthService, JwtStrategy ],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: async ( configService : ConfigService ) => ({
        secret: configService.get<string>( 'JWT_SECRET' ),
        signOptions: { expiresIn: configService.get<string>( 'JWT_EXPIRES_IN' ) }
      })
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    PeopleInfoModule,
    RolesModule,
    SubparametersModule,
    SessionsModule,
  ],
  exports: [ JwtStrategy, PassportModule, JwtModule ]
})
export class AuthModule {}
