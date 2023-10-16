import { Module } from '@nestjs/common'
import { CompanyLogosService } from './company-logos.service'
import { CompanyLogosResolver } from './company-logos.resolver'
import { PrismaService } from 'src/prisma'
import { CompaniesModule } from '../companies/companies.module'

@Module({
  providers: [
    CompanyLogosResolver,
    CompanyLogosService,
    PrismaService
  ],

  imports: [
    CompaniesModule,
  ],
  exports: [
    CompanyLogosService
  ]
})
export class CompanyLogosModule {}
