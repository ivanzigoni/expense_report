import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { ExpenseModule } from '../database/expense/expense.module';
import Bull from 'bull';
import { MailQueueConsumer } from './mailQueue.consumer';

@Module({
  providers: [MailQueueConsumer],
  imports: [
    ExpenseModule,
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: +configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'mailqueue',
    }),
    ExpenseModule,
  ],
})
export class QueueManagerModule {}
