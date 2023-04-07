import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';

@Injectable()
export class UserReposiroty {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
  ) {}

  public async findOnyById(id: number) {
    try {
      return this.userRepo.findOneOrFail({ where: { id }})
    } catch (err) {
      return false;
    }
  }


  public async create() {
    
  }
}
