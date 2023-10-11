import { Injectable } from '@nestjs/common';
import { CreateCompanyAddressInput } from './dto/create-company-address.input';
import { UpdateCompanyAddressInput } from './dto/update-company-address.input';

@Injectable()
export class CompanyAddressesService {
  create(createCompanyAddressInput: CreateCompanyAddressInput) {
    return 'This action adds a new companyAddress';
  }

  findAll() {
    return `This action returns all companyAddresses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyAddress`;
  }

  update(id: number, updateCompanyAddressInput: UpdateCompanyAddressInput) {
    return `This action updates a #${id} companyAddress`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyAddress`;
  }
}
