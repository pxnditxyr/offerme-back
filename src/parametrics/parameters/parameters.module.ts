import { Module } from '@nestjs/common'
import { ParametersService } from './parameters.service'
import { ParametersResolver } from './parameters.resolver'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  providers: [
    ParametersResolver,
    ParametersService,
    PrismaService
  ],
  exports: [
    ParametersService
  ]
})
export class ParametersModule {}
