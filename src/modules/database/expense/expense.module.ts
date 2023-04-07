import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseEntity } from './expense.entity';
import { ExpenseRepository } from './repository/expense.repository';
import { ExpenseService } from './service/expense.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseEntity])],
  providers: [ExpenseService, ExpenseRepository],
  exports: [ExpenseService]
})
export class ExpenseModule {}
