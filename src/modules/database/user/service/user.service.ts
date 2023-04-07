import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  public async getAll() {
    return this.userRepo.findAll();
  }

  public async getOneById(id: number) {
    const user = await this.userRepo.findOneById(id);

    if (!user) {
      throw new NotFoundException("user not found");
    } else {
      return user;
    }
  }
}
