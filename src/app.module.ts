import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ExpenseManager } from './modules/expense-manager/expense-manager.module';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from './modules/mailer/mailer.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, ExpenseManager, DatabaseModule, ConfigModule, MailerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
