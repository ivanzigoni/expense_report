import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ExpenseManager } from './modules/expense-manager/expense-manager.module';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from './modules/mailer/mailer.module';
import { QueueManagerModule } from './modules/queue-manager/queue-manager.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ExpenseManager,
    DatabaseModule,
    ConfigModule,
    MailerModule,
    QueueManagerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
