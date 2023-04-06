import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Teste1Module } from './teste1/teste1.module';
import { AuthModule } from './modules/auth/auth.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [Teste1Module, AuthModule, ExpenseModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
