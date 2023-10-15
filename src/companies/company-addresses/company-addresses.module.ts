import { Module } from '@nestjs/common'
import { CompanyAddressesService } from './company-addresses.service'
import { CompanyAddressesResolver } from './company-addresses.resolver'
import { PrismaService } from 'src/prisma'
import { AddressesModule } from 'src/contact-information'
import { CompaniesModule } from '../companies/companies.module'

@Module({
  providers: [
    CompanyAddressesResolver,
    CompanyAddressesService,
    PrismaService
  ],
  imports: [
    AddressesModule,
    CompaniesModule
  ],
  exports: [
    CompanyAddressesService
  ]
})
export class CompanyAddressesModule {}
