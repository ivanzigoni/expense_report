import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { TokenPayload } from '../../../common/tokenPayload.interface';
import { UserEntity } from '../../../modules/database/user/user.entity';
import { UserService } from '../../database/user/service/user.service'
import { CreateUserDto } from '../../database/user/user.dto';
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

  @ApiOkResponse({
    type: UserEntity,
  })
  @Post("/signup")
  createUser(
    @Body(new ValidationPipe()) userDto: CreateUserDto
  ): Promise<UserEntity> {
    return this.userService.create(userDto);
  }

  @ApiOkResponse({
    type: TokenPayload,
  })
  @Post("/login")
  login(
    @Body(new ValidationPipe()) loginCredentials: LoginCredentialsDto
  ): Promise<TokenPayload> {
    return this.authService.signIn(loginCredentials)
  }

  @ApiProperty({
    type: String
  })
  @Get("/healthcheck")
  teste() {
    return "ok"
  }

}
