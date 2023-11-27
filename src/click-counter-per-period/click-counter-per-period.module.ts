import { Module } from '@nestjs/common'
import { ClickCounterPerPeriodService } from './click-counter-per-period.service'
import { ClickCounterPerPeriodResolver } from './click-counter-per-period.resolver'
import { PrismaService } from 'src/prisma'
import { CompaniesModule } from 'src/companies'

@Module({
  providers: [
    ClickCounterPerPeriodResolver,
    ClickCounterPerPeriodService,
    PrismaService
  ],
  imports: [ CompaniesModule ],
  exports: [ ClickCounterPerPeriodService ]
})
export class ClickCounterPerPeriodModule {}
