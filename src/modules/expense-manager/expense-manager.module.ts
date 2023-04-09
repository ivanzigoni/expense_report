import { Module } from '@nestjs/common';
import { ExpenseManagerService } from './service/expense-manager.service';
import { ExpenseManagerController } from './controller/expense-manager.controller';
import { BullModule } from '@nestjs/bull';
import { UserModule } from '../database/user/user.module';
import { ExpenseModule } from '../database/expense/expense.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, ExpenseModule, UserModule, BullModule.registerQueue({
    name: "mailqueue"
  })],
  providers: [ExpenseManagerService],
  controllers: [ExpenseManagerController]
})
export class ExpenseManager {}
