import { Module } from '@nestjs/common';
import { CompanyPhonesService } from './company-phones.service';
import { CompanyPhonesResolver } from './company-phones.resolver';

@Module({
  providers: [CompanyPhonesResolver, CompanyPhonesService],
})
export class CompanyPhonesModule {}
