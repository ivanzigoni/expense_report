import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [AuthModule, ExpenseModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
