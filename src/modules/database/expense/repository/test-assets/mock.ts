import { UserEntity } from 'src/modules/database/user/user.entity';
import { ExpenseEntity } from '../../expense.entity';

export const user1: Partial<UserEntity> = {
  email: 'user1@gmail.com',
  firstName: 'user',
  lastName: '1',
  id: 1,
  password: '123456',
};

export const user2: Partial<UserEntity> = {
  email: 'user2@gmail.com',
  firstName: 'user',
  lastName: '2',
  id: 2,
  password: '123456',
};

export const expensesArr: Partial<ExpenseEntity>[] = [
  {
    description: 'expense1',
    expenseDate: new Date(),
    expenseValue: 10000,
    id: 1,
    userId: 1,
  },
  {
    description: 'expense2',
    expenseDate: new Date(),
    expenseValue: 50000,
    id: 2,
    userId: 1,
  },
  {
    description: 'expense3',
    expenseDate: new Date(),
    expenseValue: 60000,
    id: 1,
    userId: 1,
  },
];
