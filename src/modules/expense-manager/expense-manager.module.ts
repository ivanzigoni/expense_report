import { Module } from '@nestjs/common';
import { ExpenseManagerService } from './service/expense-manager.service';
import { ExpenseManagerController } from './controller/expense-manager.controller';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [BullModule.registerQueue({
    name: "mailqueue"
  })],
  providers: [ExpenseManagerService],
  controllers: [ExpenseManagerController]
})
export class ExpenseManager {}
