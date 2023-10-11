import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompanyAddressesService } from './company-addresses.service';
import { CompanyAddress } from './entities/company-address.entity';
import { CreateCompanyAddressInput } from './dto/create-company-address.input';
import { UpdateCompanyAddressInput } from './dto/update-company-address.input';

@Resolver(() => CompanyAddress)
export class CompanyAddressesResolver {
  constructor(private readonly companyAddressesService: CompanyAddressesService) {}

  @Mutation(() => CompanyAddress)
  createCompanyAddress(@Args('createCompanyAddressInput') createCompanyAddressInput: CreateCompanyAddressInput) {
    return this.companyAddressesService.create(createCompanyAddressInput);
  }

  @Query(() => [CompanyAddress], { name: 'companyAddresses' })
  findAll() {
    return this.companyAddressesService.findAll();
  }

  @Query(() => CompanyAddress, { name: 'companyAddress' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.companyAddressesService.findOne(id);
  }

  @Mutation(() => CompanyAddress)
  updateCompanyAddress(@Args('updateCompanyAddressInput') updateCompanyAddressInput: UpdateCompanyAddressInput) {
    return this.companyAddressesService.update(updateCompanyAddressInput.id, updateCompanyAddressInput);
  }

  @Mutation(() => CompanyAddress)
  removeCompanyAddress(@Args('id', { type: () => Int }) id: number) {
    return this.companyAddressesService.remove(id);
  }
}
