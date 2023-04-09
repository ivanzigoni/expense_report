import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/user.entity';
import { CreateExpenseDto, UpdateExpenseDto } from '../expense.dto';
import { ExpenseEntity } from '../expense.entity';
import { ExpenseRepository } from './expense.repository';
import { expensesArr, user1 } from './test-assets/mock';

describe('Expense', () => {
  type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
  };

  const repositoryMockFactory: () => MockType<Repository<ExpenseEntity>> = jest.fn(() => ({
    findOne: jest.fn((id: number) => { return {} }),
    find: jest.fn((id: number) => { return {} }),
    create: jest.fn((id: number) => { return {} }),
    update: jest.fn((id: number) => { return {} }),
    save: jest.fn((id: number) => { return {} }),
    merge: jest.fn((id: number) => { return {} }),
    delete: jest.fn((id: number) => { return {} }),
  }));

  let provider: ExpenseRepository;
  let repoMock: MockType<Repository<ExpenseEntity>>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseRepository,
        {
        provide: getRepositoryToken(ExpenseEntity),
        useFactory: repositoryMockFactory
      }],
    }).compile();

    provider = module.get<ExpenseRepository>(ExpenseRepository);
    repoMock = module.get(getRepositoryToken(ExpenseEntity));
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it("findAll should return full list of expenses", async () => {
    repoMock.find.mockImplementation(() => expensesArr)

    const expenses = await provider.findAll()

    expect(expenses).toHaveLength(expensesArr.length)
  });

  it("findOnyById should return expense with the same id as it was received as argument", async () => {
    repoMock.findOne.mockImplementation(() => expensesArr[0])

    const expense = await provider.findOneById(1)

    expect(expense.id).toBe(1);
  });

  it("create should return the created entity", async () => {
    const expenseWithUser = { ...expensesArr[0], user: user1 }

    repoMock.create.mockImplementation(() => expenseWithUser);
    repoMock.save.mockImplementation(() => expenseWithUser);

    const expense = await provider.create(expensesArr[0] as CreateExpenseDto, user1 as UserEntity)

    expect(expense.user.id).toBe(user1.id);
    expect(expense.description).toBe(expensesArr[0].description);
  });

  it("update should return the updated entity", async () => {
    const updateExpenseDto: UpdateExpenseDto = {
      description: "new description",
      expenseDate: expensesArr[0].expenseDate,
      expenseValue: expensesArr[0].expenseValue
    }

    repoMock.merge.mockImplementation(() => ({ ...expensesArr[0], ...updateExpenseDto }));
    repoMock.save.mockImplementation(() => ({ ...expensesArr[0], ...updateExpenseDto }));

    const expense = await provider.update(expensesArr[0] as ExpenseEntity, updateExpenseDto)

    expect(expense.description).toBe(updateExpenseDto.description);
  });

  it("delete should return db delete confirmation message", async () => {
    const updateExpenseDto: UpdateExpenseDto = {
      description: "new description",
      expenseDate: expensesArr[0].expenseDate,
      expenseValue: expensesArr[0].expenseValue
    }

    repoMock.delete.mockImplementation(() => ({ affected: 1 }));

    const message = await provider.delete(1);

    expect(message.affected).toBe(1);
  });


});
