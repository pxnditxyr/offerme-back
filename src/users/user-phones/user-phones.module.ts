import { Module } from '@nestjs/common';
import { UserPhonesService } from './user-phones.service';
import { UserPhonesResolver } from './user-phones.resolver';

@Module({
  providers: [UserPhonesResolver, UserPhonesService],
})
export class UserPhonesModule {}
