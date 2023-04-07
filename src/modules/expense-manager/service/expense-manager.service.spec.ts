import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseManagerService } from './expense-manager.service';

describe('ExpenseManagerService', () => {
  let service: ExpenseManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseManagerService],
    }).compile();

    service = module.get<ExpenseManagerService>(ExpenseManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
