import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'

import { ParametersModule, SubparametersModule } from './parametrics'
import {
  PeopleInfoModule,
  UserAvatarsModule,
  UsersModule,
  RolesModule,
  SessionsModule,
} from './users'

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault(),
      ]
    }),
    ParametersModule,
    SubparametersModule,
    PeopleInfoModule,
    UsersModule,
    UserAvatarsModule,
    RolesModule,
    SessionsModule,
  ]
})
export class AppModule {}
