import { Module } from '@nestjs/common';
import { CompanyAddressesService } from './company-addresses.service';
import { CompanyAddressesResolver } from './company-addresses.resolver';

@Module({
  providers: [CompanyAddressesResolver, CompanyAddressesService],
})
export class CompanyAddressesModule {}
