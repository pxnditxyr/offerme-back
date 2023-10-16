import { Module } from '@nestjs/common'
import { CompanyPhonesService } from './company-phones.service'
import { CompanyPhonesResolver } from './company-phones.resolver'
import { PrismaService } from 'src/prisma'
import { CompaniesModule } from '../companies/companies.module'
import { PhonesModule } from 'src/contact-information'

@Module({
  providers: [
    CompanyPhonesResolver,
    CompanyPhonesService,
    PrismaService,
  ],
  imports: [
    CompaniesModule,
    PhonesModule,
  ],
  exports: [
    CompanyPhonesService
  ]
})
export class CompanyPhonesModule {}
