import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from '../../database/user/repository/user.repository';
import { UserService } from '../../database/user/service/user.service';
import { UserEntity } from '../../database/user/user.entity';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const userServiceFactory = () => ({});
  const userRepositoryFactory = () => ({});
  const userDbRepoFactory = () => ({});

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: UserService,
          useFactory: userServiceFactory,
        },
        {
          provide: UserRepository,
          useFactory: userRepositoryFactory,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: userDbRepoFactory,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
