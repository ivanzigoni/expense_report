import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto, UpdateUserDto } from '../user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository
  ) {}

  public async create(userDto: CreateUserDto) {
    const user = await this.userRepo.findOneByEmail(userDto.email);

    if (user) {
      throw new ForbiddenException("email already in use");
    } else {
      return this.userRepo.create(userDto)
    }

  }

  public async update(id: number, userDto: UpdateUserDto) {
    const user = await this.userRepo.findOneById(id);

    if (!user) {
      throw new ForbiddenException("user does not exist");
    } else {
      return this.userRepo.update(user, userDto);
    }
  }
}
