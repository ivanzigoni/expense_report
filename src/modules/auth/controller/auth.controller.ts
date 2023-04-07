import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { UserService } from 'src/modules/database/user/service/user.service';
import { CreateUserDto } from 'src/modules/database/user/user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService 
  ) {}

  @Post("/user")
  createUser(
    @Body(new ValidationPipe()) userDto: CreateUserDto
  ) {
    return this.userService.create(userDto);
  }

}
