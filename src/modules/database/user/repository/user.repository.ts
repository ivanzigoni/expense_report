import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../user.dto';
import { UserEntity } from '../user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
  ) {}

  public async create(userDto: CreateUserDto) {
      const user = await this.userRepo.findOne({ where: { email: userDto.email } });

      if (user) {
        throw new ForbiddenException("email already in use");
      }

      return this.userRepo.save(
        this.userRepo.create({ ...userDto })
      )
  }

  public async update(id: number, userDto: UpdateUserDto ) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new ForbiddenException("user does not exist");
    }

    return this.userRepo.save(
      this.userRepo.merge(user, { ...userDto })
    )
  }
}
