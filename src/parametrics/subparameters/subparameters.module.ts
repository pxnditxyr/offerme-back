import { Module } from '@nestjs/common'
import { SubparametersService } from './subparameters.service'
import { SubparametersResolver } from './subparameters.resolver'
import { PrismaService } from 'src/prisma/prisma.service'
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
})
export class SubparametersModule {}
