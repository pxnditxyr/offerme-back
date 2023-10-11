import { Injectable } from '@nestjs/common';
import { CreateCompanyPhoneInput } from './dto/create-company-phone.input';
import { UpdateCompanyPhoneInput } from './dto/update-company-phone.input';

@Injectable()
export class CompanyPhonesService {
  create(createCompanyPhoneInput: CreateCompanyPhoneInput) {
    return 'This action adds a new companyPhone';
  }

  findAll() {
    return `This action returns all companyPhones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyPhone`;
  }

  update(id: number, updateCompanyPhoneInput: UpdateCompanyPhoneInput) {
    return `This action updates a #${id} companyPhone`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyPhone`;
  }
}
