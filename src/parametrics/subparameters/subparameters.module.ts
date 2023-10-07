import { Module } from '@nestjs/common'
import { SubparametersService } from './subparameters.service'
import { SubparametersResolver } from './subparameters.resolver'
import { PrismaService } from '../../prisma'
import { ParametersModule } from '../parameters/parameters.module'

@Module({
  providers: [
    SubparametersResolver,
    SubparametersService,
    PrismaService
  ],
  imports: [
    ParametersModule
  ],
  exports: [
    SubparametersService,
  ]
})
export class SubparametersModule {}
