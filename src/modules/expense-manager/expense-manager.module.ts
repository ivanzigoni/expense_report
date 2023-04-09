import { Module } from '@nestjs/common';
import { ExpenseManagerService } from './service/expense-manager.service';
import { ExpenseManagerController } from './controller/expense-manager.controller';
import { AuthModule } from '../auth/auth.module';
import { ExpenseModule } from '../database/expense/expense.module';
import { UserModule } from '../database/user/user.module';
import { QueueManagerModule } from '../queue-manager/queue-manager.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [AuthModule, ExpenseModule, UserModule,     BullModule.registerQueue({
    name: "mailqueue"
  })],
  providers: [ExpenseManagerService],
  controllers: [ExpenseManagerController]
})
export class ExpenseManager {}
