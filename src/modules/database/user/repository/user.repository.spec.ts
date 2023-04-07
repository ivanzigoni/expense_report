import { Test, TestingModule } from '@nestjs/testing';
import { UserReposiroty } from './user.repository';

describe('User', () => {
  let provider: UserReposiroty;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserReposiroty],
    }).compile();

    provider = module.get<UserReposiroty>(UserReposiroty);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
