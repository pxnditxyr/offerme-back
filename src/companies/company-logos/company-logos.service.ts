import { Injectable } from '@nestjs/common';
import { CreateCompanyLogoInput } from './dto/create-company-logo.input';
import { UpdateCompanyLogoInput } from './dto/update-company-logo.input';

@Injectable()
export class CompanyLogosService {
  create(createCompanyLogoInput: CreateCompanyLogoInput) {
    return 'This action adds a new companyLogo';
  }

  findAll() {
    return `This action returns all companyLogos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyLogo`;
  }

  update(id: number, updateCompanyLogoInput: UpdateCompanyLogoInput) {
    return `This action updates a #${id} companyLogo`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyLogo`;
  }
}
