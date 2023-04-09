import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExpenseEntity } from '../expense.entity';
import { ExpenseRepository } from '../repository/expense.repository';
import { ExpenseService } from './expense.service';
import { expensesArr, user1 } from '../repository/test-assets/mock';
import { CreateExpenseDto, UpdateExpenseDto } from '../expense.dto';
import { UserEntity } from '../../user/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('Expense Service', () => {
  type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
  };
  let expenseService: ExpenseService;
  let expenseRepository: MockType<ExpenseRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ExpenseService,
        ExpenseRepository,
        {
          provide: getRepositoryToken(ExpenseEntity),
          useFactory: () => {},
        },
      ],
    }).compile();

    expenseService = module.get<ExpenseService>(ExpenseService);
    expenseRepository = module.get(ExpenseRepository);
  });

  it('should be defined', () => {
    expect(expenseService).toBeDefined();
  });

  it('create should return the created entity', async () => {
    const createExpenseDto: CreateExpenseDto = {
      description: expensesArr[0].description,
      expenseDate: expensesArr[0].expenseDate,
      expenseValue: expensesArr[0].expenseValue,
    };

    const expectedResult = { ...createExpenseDto, user: user1 };

    expenseRepository.create = jest.fn(() => expectedResult);

    const result = await expenseService.create(
      createExpenseDto,
      user1 as UserEntity,
    );

    expect(result).toEqual(expectedResult);
  });

  it('update should return the updated entity if entity exists', async () => {
    const updateExpenseDto: UpdateExpenseDto = {
      description: 'new description1',
      expenseDate: expensesArr[0].expenseDate,
      expenseValue: expensesArr[0].expenseValue,
    };

    const expectedResult = {
      ...expensesArr[0],
      user: user1,
      description: updateExpenseDto.description,
    };

    expenseRepository.update = jest.fn(() => expectedResult);

    expenseRepository.findOneById = jest.fn(() => expensesArr[0]);

    const result = await expenseService.update(
      expensesArr[0].id,
      updateExpenseDto,
    );

    expect(result).toEqual(expectedResult);
  });

  it('update should throw if expense is not found', async () => {
    const updateExpenseDto: UpdateExpenseDto = {
      description: 'new description1',
      expenseDate: expensesArr[0].expenseDate,
      expenseValue: expensesArr[0].expenseValue,
    };

    const expectedResult = {
      ...expensesArr[0],
      user: user1,
      description: updateExpenseDto.description,
    };

    expenseRepository.update = jest.fn(() => expectedResult);

    expenseRepository.findOneById = jest.fn(() => null);

    try {
      await expenseService.update(expensesArr[0].id, updateExpenseDto);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('getAll must return list of expenses', async () => {
    expenseRepository.findAll = jest.fn(() => expensesArr);

    const result = await expenseService.getAll();

    expect(result).toEqual(expensesArr);
  });

  it('getOneById must return an expense given it`s id', async () => {
    expenseRepository.findOneById = jest.fn(() => expensesArr[0]);

    const result = await expenseService.getOneById(1);

    expect(result).toEqual(expensesArr[0]);
  });

  it('getOneById should throw if expense is not found', async () => {
    expenseRepository.findOneById = jest.fn(() => null);

    try {
      await expenseService.getOneById(1);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('delete should return db delete confirmation message', async () => {
    expenseRepository.delete = jest.fn(() => ({ affected: 1 }));

    const message = await expenseService.delete(1);

    expect(message.affected).toBe(1);
  });
});
