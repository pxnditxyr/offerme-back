import { Module } from '@nestjs/common'
import { SeedService } from './seed.service'
import { SeedResolver } from './seed.resolver'
import { PrismaService } from 'src/prisma'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from 'src/users'

@Module({
  providers: [
    SeedResolver,
    SeedService,
    PrismaService
  ],
  imports: [
    ConfigModule,
    UsersModule
  ]
})
export class SeedModule {}
