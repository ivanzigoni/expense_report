import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { ExpenseEntity } from '../expense.entity';
import { ExpenseRepository } from '../repository/expense.repository';
import { ExpenseService } from './expense.service';

describe('ExpenseService', () => {
  let service: ExpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [ExpenseService],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
