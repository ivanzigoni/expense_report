import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../repository/user.repository';
import { UserService } from './user.service';

describe('UserService', () => {

  const repositoryFactory = () => ({

  })

  let service: UserService;
  let repository: UserRepository;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, {
        provide: UserRepository,
        useFactory: repositoryFactory
      }],
    }).compile();

    repository = module.get(UserRepository)
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
