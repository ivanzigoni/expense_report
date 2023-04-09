import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../user.dto';
import { UserEntity } from '../user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  public async findAll() {
    return this.userRepo.find();
  }

  public async findOneByEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('user not found');
    } else {
      return user;
    }
  }

  public async findOneById(id: number, relations: string[] = []) {
    try {
      return this.userRepo.findOneOrFail({ where: { id }, relations });
    } catch (err) {
      throw new NotFoundException('user not found');
    }
  }

  public async create(userDto: CreateUserDto) {
    return this.userRepo.save(this.userRepo.create({ ...userDto }));
  }

  public async update(user: UserEntity, userDto: UpdateUserDto) {
    return this.userRepo.save(this.userRepo.merge(user, { ...userDto }));
  }
}
