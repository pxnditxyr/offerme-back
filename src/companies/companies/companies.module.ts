import { Module } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CompaniesResolver } from './companies.resolver'
import { PrismaService } from 'src/prisma'
import { SubparametersModule } from 'src/parametrics'

@Module({
  providers: [
    CompaniesResolver,
    CompaniesService,
    PrismaService,
  ],
  imports: [
    SubparametersModule,
  ],
  exports: [
    CompaniesService,
  ]
})
export class CompaniesModule {}
