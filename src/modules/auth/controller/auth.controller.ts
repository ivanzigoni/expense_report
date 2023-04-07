import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { UserService } from 'src/modules/database/user/service/user.service';
import { CreateUserDto } from 'src/modules/database/user/user.dto';
import { LoginCredentialsDto } from '../LoginCredentialsDto';
import { AuthService } from '../service/auth.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Post("/user")
  createUser(
    @Body(new ValidationPipe()) userDto: CreateUserDto
  ) {
    return this.userService.create(userDto);
  }

  @Post("/login")
  login(
    @Body(new ValidationPipe()) loginCredentials: LoginCredentialsDto
  ) {
    return this.authService.signIn(loginCredentials)
  }

}
