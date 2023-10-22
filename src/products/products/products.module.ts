import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsResolver } from './products.resolver'
import { PrismaService } from 'src/prisma'
import { CompaniesModule } from 'src/companies'
import { SubparametersModule } from 'src/parametrics'

@Module({
  providers: [
    ProductsResolver,
    ProductsService,
    PrismaService,
  ],
  imports: [
    CompaniesModule,
    SubparametersModule
  ],
  exports: [
    ProductsService,
  ]
})
export class ProductsModule {}
