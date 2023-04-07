import { Injectable } from '@nestjs/common';
import { ExpenseService } from 'src/modules/database/expense/service/expense.service';
import { SendEmailPayload } from '../interfaces/register-expense.dto';

@Injectable()
export class ExpenseManagerService {
  constructor(
    private readonly expenseService: ExpenseService,
  ) {}

  public async sendEmail(payload: SendEmailPayload) {
    // email
  }
}
