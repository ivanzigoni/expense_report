import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from '../expense.dto';
import { ExpenseEntity } from '../expense.entity';

@Injectable()
export class ExpenseRepository {
  constructor(
    @InjectRepository(ExpenseEntity)
    private readonly expenseRepo: Repository<ExpenseEntity>
  ) {}

  public async findAll() {
    return this.expenseRepo.find();
  }

  public async findOneById(id: number) {
    return this.expenseRepo.findOne({ where: { id }})
  }

  public async create(expenseDto: CreateExpenseDto) {
      return this.expenseRepo.save(
        this.expenseRepo.create({ ...expenseDto })
      )
  }

  public async update(expense: ExpenseEntity, expenseDto: CreateExpenseDto ) {
    return this.expenseRepo.save(
      this.expenseRepo.merge(expense, { ...expenseDto })
    )
  }
}
