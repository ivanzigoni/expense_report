import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './src/modules/database/user/user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, ExpenseModule, DatabaseModule, ConfigModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
