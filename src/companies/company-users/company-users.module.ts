import { Module } from '@nestjs/common';
import { CompanyUsersService } from './company-users.service';
import { CompanyUsersResolver } from './company-users.resolver';

@Module({
  providers: [CompanyUsersResolver, CompanyUsersService],
})
export class CompanyUsersModule {}
