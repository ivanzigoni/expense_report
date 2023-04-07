import { ExpenseEntity } from "src/modules/database/expense/expense.entity";

export interface SendEmailPayload {
  expense: ExpenseEntity;
}