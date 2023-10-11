import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompanyPhonesService } from './company-phones.service';
import { CompanyPhone } from './entities/company-phone.entity';
import { CreateCompanyPhoneInput } from './dto/create-company-phone.input';
import { UpdateCompanyPhoneInput } from './dto/update-company-phone.input';

@Resolver(() => CompanyPhone)
export class CompanyPhonesResolver {
  constructor(private readonly companyPhonesService: CompanyPhonesService) {}

  @Mutation(() => CompanyPhone)
  createCompanyPhone(@Args('createCompanyPhoneInput') createCompanyPhoneInput: CreateCompanyPhoneInput) {
    return this.companyPhonesService.create(createCompanyPhoneInput);
  }

  @Query(() => [CompanyPhone], { name: 'companyPhones' })
  findAll() {
    return this.companyPhonesService.findAll();
  }

  @Query(() => CompanyPhone, { name: 'companyPhone' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.companyPhonesService.findOne(id);
  }

  @Mutation(() => CompanyPhone)
  updateCompanyPhone(@Args('updateCompanyPhoneInput') updateCompanyPhoneInput: UpdateCompanyPhoneInput) {
    return this.companyPhonesService.update(updateCompanyPhoneInput.id, updateCompanyPhoneInput);
  }

  @Mutation(() => CompanyPhone)
  removeCompanyPhone(@Args('id', { type: () => Int }) id: number) {
    return this.companyPhonesService.remove(id);
  }
}
