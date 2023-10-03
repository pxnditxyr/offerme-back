import { Module } from '@nestjs/common';
import { PeopleInfoService } from './people-info.service';
import { PeopleInfoResolver } from './people-info.resolver';

@Module({
  providers: [PeopleInfoResolver, PeopleInfoService],
})
export class PeopleInfoModule {}
