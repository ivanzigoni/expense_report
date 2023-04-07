import { Module } from '@nestjs/common';
import { ExpenseManagerService } from './service/expense-manager.service';
import { ExpenseManagerController } from './controller/expense-manager.controller';
import { AuthModule } from '../auth/auth.module';
import { ExpenseModule } from '../database/expense/expense.module';
import { UserModule } from '../database/user/user.module';

@Module({
  imports: [AuthModule, ExpenseModule, UserModule],
  providers: [ExpenseManagerService],
  controllers: [ExpenseManagerController]
})
export class ExpenseManager {}
