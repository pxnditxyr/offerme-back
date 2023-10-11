import { Injectable } from '@nestjs/common';
import { CreateCompanyUserInput } from './dto/create-company-user.input';
import { UpdateCompanyUserInput } from './dto/update-company-user.input';

@Injectable()
export class CompanyUsersService {
  create(createCompanyUserInput: CreateCompanyUserInput) {
    return 'This action adds a new companyUser';
  }

  findAll() {
    return `This action returns all companyUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyUser`;
  }

  update(id: number, updateCompanyUserInput: UpdateCompanyUserInput) {
    return `This action updates a #${id} companyUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyUser`;
  }
}
