import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompanyUsersService } from './company-users.service';
import { CompanyUser } from './entities/company-user.entity';
import { CreateCompanyUserInput } from './dto/create-company-user.input';
import { UpdateCompanyUserInput } from './dto/update-company-user.input';

@Resolver(() => CompanyUser)
export class CompanyUsersResolver {
  constructor(private readonly companyUsersService: CompanyUsersService) {}

  @Mutation(() => CompanyUser)
  createCompanyUser(@Args('createCompanyUserInput') createCompanyUserInput: CreateCompanyUserInput) {
    return this.companyUsersService.create(createCompanyUserInput);
  }

  @Query(() => [CompanyUser], { name: 'companyUsers' })
  findAll() {
    return this.companyUsersService.findAll();
  }

  @Query(() => CompanyUser, { name: 'companyUser' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.companyUsersService.findOne(id);
  }

  @Mutation(() => CompanyUser)
  updateCompanyUser(@Args('updateCompanyUserInput') updateCompanyUserInput: UpdateCompanyUserInput) {
    return this.companyUsersService.update(updateCompanyUserInput.id, updateCompanyUserInput);
  }

  @Mutation(() => CompanyUser)
  removeCompanyUser(@Args('id', { type: () => Int }) id: number) {
    return this.companyUsersService.remove(id);
  }
}
