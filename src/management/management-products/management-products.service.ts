import { Injectable } from '@nestjs/common';
import { CreateManagementProductInput } from './dto/create-management-product.input';
import { UpdateManagementProductInput } from './dto/update-management-product.input';

@Injectable()
export class ManagementProductsService {
  create(createManagementProductInput: CreateManagementProductInput) {
    return 'This action adds a new managementProduct';
  }

  findAll() {
    return `This action returns all managementProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} managementProduct`;
  }

  update(id: number, updateManagementProductInput: UpdateManagementProductInput) {
    return `This action updates a #${id} managementProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} managementProduct`;
  }
}
