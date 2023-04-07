import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../database/user/user.module';
import { JwtModule } from "@nestjs/jwt"
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [JwtModule.registerAsync({
    global: true,
    useFactory: (configService: ConfigService) => ({
      global: true,
      secret: configService.get("JWT_SECRET"),
      signOptions: { expiresIn: "60s" }
    }),
    inject: [ConfigService],
  }), UserModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
