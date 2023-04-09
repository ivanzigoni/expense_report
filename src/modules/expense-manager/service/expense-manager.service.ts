import { Injectable } from '@nestjs/common';
import { ExpenseEntity } from 'src/modules/database/expense/expense.entity';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class ExpenseManagerService {
  constructor(
    @InjectQueue("mailqueue")
    private readonly mailQueue: Queue
  ) {}

  public async sendConfirmationMail(payload: { expense: ExpenseEntity }) {
    const expenseId = payload.expense.id;

    await this.mailQueue.add(expenseId);

    return { message: "ok" }
  }
}
