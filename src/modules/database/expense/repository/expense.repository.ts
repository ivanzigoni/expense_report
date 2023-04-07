import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/user.entity';
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

  public async findOneById(id: number, relations: string[] = []) {
    console.log(relations, "relations")
    const teste = await this.expenseRepo.findOne({ where: { id }, relations })
    console.log(teste);
    return teste
  }

  public async create(expenseDto: CreateExpenseDto, user: UserEntity) {
    console.log(expenseDto)

    const expense = this.expenseRepo.create(expenseDto);
    expense.user = user;

    console.log(expense);
    return this.expenseRepo.save(expense);
  }

  public async update(expense: ExpenseEntity, expenseDto: CreateExpenseDto ) {
    return this.expenseRepo.save(
      this.expenseRepo.merge(expense, { ...expenseDto })
    )
  }

  public async delete(id: number) {
    return this.expenseRepo.delete(id)
  }
}
