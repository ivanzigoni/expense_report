import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../../user/user.entity';
import { CreateExpenseDto, UpdateExpenseDto } from '../expense.dto';
import { ExpenseRepository } from '../repository/expense.repository';

@Injectable()
export class ExpenseService {
  constructor(private readonly expenseRepo: ExpenseRepository) {}

  public async create(expenseDto: CreateExpenseDto, user: UserEntity) {
    return this.expenseRepo.create(expenseDto, user);
  }

  public async update(id: number, expenseDto: UpdateExpenseDto) {
    const expense = await this.expenseRepo.findOneById(id);

    if (!expense) {
      throw new NotFoundException('expense not found');
    } else {
      return this.expenseRepo.update(expense, expenseDto);
    }
  }

  public async getAll() {
    return this.expenseRepo.findAll();
  }

  public async getOneById(id: number, relations: string[] = []) {
    const expense = await this.expenseRepo.findOneById(id, relations);

    if (!expense) {
      throw new NotFoundException('expense not found');
    } else {
      return expense;
    }
  }

  public async delete(id: number) {
    return this.expenseRepo.delete(id);
  }
}
