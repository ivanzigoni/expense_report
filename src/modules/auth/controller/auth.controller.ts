import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors, ValidationPipe, Request } from '@nestjs/common';
import { UserService } from 'src/modules/database/user/service/user.service';
import { CreateUserDto } from 'src/modules/database/user/user.dto';
import { AuthGuard } from '../auth.guard';
import { LoginCredentialsDto } from '../LoginCredentialsDto';
import { AuthService } from '../service/auth.service';

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

  @UseGuards(AuthGuard)
  @Get("/teste")
  teste(
    @Request() req
  ) {
    console.log(req.user)
    return "ok"
  }

}
