import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';


@Module({
  providers: [AuthService]
})
export class AuthModule {}
