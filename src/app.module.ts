import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ExpenseManager } from './modules/expense-manager/expense-manager.module';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, ExpenseManager, DatabaseModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
