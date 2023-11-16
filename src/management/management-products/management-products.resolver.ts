import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ManagementProductsService } from './management-products.service';
import { ManagementProduct } from './entities/management-product.entity';
import { CreateManagementProductInput } from './dto/create-management-product.input';
import { UpdateManagementProductInput } from './dto/update-management-product.input';

@Resolver(() => ManagementProduct)
export class ManagementProductsResolver {
  constructor(private readonly managementProductsService: ManagementProductsService) {}

  @Mutation(() => ManagementProduct)
  createManagementProduct(@Args('createManagementProductInput') createManagementProductInput: CreateManagementProductInput) {
    return this.managementProductsService.create(createManagementProductInput);
  }

  @Query(() => [ManagementProduct], { name: 'managementProducts' })
  findAll() {
    return this.managementProductsService.findAll();
  }

  @Query(() => ManagementProduct, { name: 'managementProduct' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.managementProductsService.findOne(id);
  }

  @Mutation(() => ManagementProduct)
  updateManagementProduct(@Args('updateManagementProductInput') updateManagementProductInput: UpdateManagementProductInput) {
    return this.managementProductsService.update(updateManagementProductInput.id, updateManagementProductInput);
  }

  @Mutation(() => ManagementProduct)
  removeManagementProduct(@Args('id', { type: () => Int }) id: number) {
    return this.managementProductsService.remove(id);
  }
}
