import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseService } from '../../database/expense/service/expense.service';
import { UserService } from '../../database/user/service/user.service';
import { ExpenseManagerService } from '../service/expense-manager.service';
import { ExpenseManagerController } from './expense-manager.controller';

describe('ExpenseManagerController', () => {
  let controller: ExpenseManagerController;

  const toDoFactories = () => ({})

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseManagerController],
      providers: [
        {
          provide: ExpenseManagerService,
          useFactory: toDoFactories
        },
        {
          provide: UserService,
          useFactory: toDoFactories
        },
        {
          provide: ExpenseService,
          useFactory: toDoFactories
        },
        {
          provide: JwtService,
          useFactory: toDoFactories
        },
        {
          provide: ConfigService,
          useFactory: toDoFactories
        }
        
      ]
    }).compile();

    controller = module.get<ExpenseManagerController>(ExpenseManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
