import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../../database/user/service/user.service'
import { CreateUserDto } from '../../database/user/user.dto';
import { AuthGuard } from '../auth.guard';
import { LoginCredentialsDto } from '../loginCredentialsDto';
import { AuthService } from '../service/auth.service';

@ApiTags("Auth")
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Post("/signup")
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

  @Get("/healthheck")
  teste() {
    return "ok"
  }

}
