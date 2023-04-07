import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseManagerController } from './expense-manager.controller';

describe('ExpenseManagerController', () => {
  let controller: ExpenseManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseManagerController],
    }).compile();

    controller = module.get<ExpenseManagerController>(ExpenseManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
