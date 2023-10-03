import { Module } from '@nestjs/common';
import { UserAvatarsService } from './user-avatars.service';
import { UserAvatarsResolver } from './user-avatars.resolver';

@Module({
  providers: [UserAvatarsResolver, UserAvatarsService],
})
export class UserAvatarsModule {}
