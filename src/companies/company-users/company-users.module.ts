import { Module } from '@nestjs/common'
import { CompanyUsersService } from './company-users.service'
import { CompanyUsersResolver } from './company-users.resolver'
import { PrismaService } from 'src/prisma'
import { UsersModule } from 'src/users'
import { CompaniesModule } from '../companies/companies.module'

@Module({
  providers: [
    CompanyUsersResolver,
    CompanyUsersService,
    PrismaService,
  ],

  imports: [
    CompaniesModule,
    UsersModule,
  ],
  exports: [
    CompanyUsersService,
  ]
})
export class CompanyUsersModule {}
