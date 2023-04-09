import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ExpenseEntity } from 'src/modules/database/expense/expense.entity';
import { ExpenseService } from 'src/modules/database/expense/service/expense.service';
import { capitalizeFirstLetter } from 'src/modules/mailer/utils/string';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class ExpenseManagerService {
  constructor(
    @InjectQueue("mailqueue")
    private readonly mailQueue: Queue
  ) {}

  public async sendEmail(payload: { expense: ExpenseEntity }) {
    const expenseId = payload.expense.id;

    await this.mailQueue.add(expenseId);

    return { message: "ok" }
  }
}
