import { ExpenseEntity } from "src/modules/database/expense/expense.entity";
import { UserEntity } from "src/modules/database/user/user.entity";

export interface SendEmailPayload {
  expense: ExpenseEntity;
}