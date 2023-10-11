import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompanyCategoriesService } from './company-categories.service';
import { CompanyCategory } from './entities/company-category.entity';
import { CreateCompanyCategoryInput } from './dto/create-company-category.input';
import { UpdateCompanyCategoryInput } from './dto/update-company-category.input';

@Resolver(() => CompanyCategory)
export class CompanyCategoriesResolver {
  constructor(private readonly companyCategoriesService: CompanyCategoriesService) {}

  @Mutation(() => CompanyCategory)
  createCompanyCategory(@Args('createCompanyCategoryInput') createCompanyCategoryInput: CreateCompanyCategoryInput) {
    return this.companyCategoriesService.create(createCompanyCategoryInput);
  }

  @Query(() => [CompanyCategory], { name: 'companyCategories' })
  findAll() {
    return this.companyCategoriesService.findAll();
  }

  @Query(() => CompanyCategory, { name: 'companyCategory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.companyCategoriesService.findOne(id);
  }

  @Mutation(() => CompanyCategory)
  updateCompanyCategory(@Args('updateCompanyCategoryInput') updateCompanyCategoryInput: UpdateCompanyCategoryInput) {
    return this.companyCategoriesService.update(updateCompanyCategoryInput.id, updateCompanyCategoryInput);
  }

  @Mutation(() => CompanyCategory)
  removeCompanyCategory(@Args('id', { type: () => Int }) id: number) {
    return this.companyCategoriesService.remove(id);
  }
}
