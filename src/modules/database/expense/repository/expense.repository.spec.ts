import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseRepository } from './expense.repository';

describe('User', () => {
  let provider: ExpenseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseRepository],
    }).compile();

    provider = module.get<ExpenseRepository>(ExpenseRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
