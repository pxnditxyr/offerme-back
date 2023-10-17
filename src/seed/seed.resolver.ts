import { Mutation, Resolver } from '@nestjs/graphql';
import { SeedService } from './seed.service';

@Resolver()
export class SeedResolver {
  constructor (
    private readonly seedService : SeedService
  ) {}

  @Mutation( () => Boolean, { description: 'Seed database' } )
  async seed () : Promise<boolean> {
    return await this.seedService.seed();
  }
}
