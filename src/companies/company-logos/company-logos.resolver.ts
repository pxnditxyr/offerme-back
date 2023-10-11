import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompanyLogosService } from './company-logos.service';
import { CompanyLogo } from './entities/company-logo.entity';
import { CreateCompanyLogoInput } from './dto/create-company-logo.input';
import { UpdateCompanyLogoInput } from './dto/update-company-logo.input';

@Resolver(() => CompanyLogo)
export class CompanyLogosResolver {
  constructor(private readonly companyLogosService: CompanyLogosService) {}

  @Mutation(() => CompanyLogo)
  createCompanyLogo(@Args('createCompanyLogoInput') createCompanyLogoInput: CreateCompanyLogoInput) {
    return this.companyLogosService.create(createCompanyLogoInput);
  }

  @Query(() => [CompanyLogo], { name: 'companyLogos' })
  findAll() {
    return this.companyLogosService.findAll();
  }

  @Query(() => CompanyLogo, { name: 'companyLogo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.companyLogosService.findOne(id);
  }

  @Mutation(() => CompanyLogo)
  updateCompanyLogo(@Args('updateCompanyLogoInput') updateCompanyLogoInput: UpdateCompanyLogoInput) {
    return this.companyLogosService.update(updateCompanyLogoInput.id, updateCompanyLogoInput);
  }

  @Mutation(() => CompanyLogo)
  removeCompanyLogo(@Args('id', { type: () => Int }) id: number) {
    return this.companyLogosService.remove(id);
  }
}
