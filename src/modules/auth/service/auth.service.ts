import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../database/user/service/user.service';
import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from '../loginCredentialsDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async signIn({ email, password }: LoginCredentialsDto) {
    const user = await this.userService.getOneByEmail(email);

    if (!user) {
      throw new NotFoundException("user not found");  
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.email, sub: user.id };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
