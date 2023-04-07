import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExpenseDto, UpdateExpenseDto } from '../expense.dto';
import { ExpenseRepository } from '../repository/expense.repository';

@Injectable()
export class ExpenseService {
  constructor(
    private readonly expenseRepo: ExpenseRepository
  ) {}

  public async create(expenseDto: CreateExpenseDto) {
    return this.expenseRepo.create(expenseDto);
  }

  public async update(id: number, expenseDto: UpdateExpenseDto) {
    const expense = await this.expenseRepo.findOneById(id);

    if (!expense) {
      throw new NotFoundException("expense not found");
    } else {
      return this.expenseRepo.update(expense, expenseDto);
    }
  }

  public async getAll() {
    return this.expenseRepo.findAll();
  }

  public async getOneById(id: number) {
    const expense = await this.expenseRepo.findOneById(id);

    if (!expense) {
      throw new NotFoundException("expense not found")
    } else {
      return expense;
    }
  }
}
