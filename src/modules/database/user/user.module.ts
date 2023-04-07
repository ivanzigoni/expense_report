import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserReposiroty } from './repository/user.repository';

@Module({
  providers: [UserService, UserReposiroty]
})
export class UserModule {}
