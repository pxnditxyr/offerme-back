import { Module } from '@nestjs/common';
import { UserAdressesService } from './user-adresses.service';
import { UserAdressesResolver } from './user-adresses.resolver';

@Module({
  providers: [UserAdressesResolver, UserAdressesService],
})
export class UserAdressesModule {}
