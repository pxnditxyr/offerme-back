import { Module } from '@nestjs/common';
import { CompanyLogosService } from './company-logos.service';
import { CompanyLogosResolver } from './company-logos.resolver';

@Module({
  providers: [CompanyLogosResolver, CompanyLogosService],
})
export class CompanyLogosModule {}
