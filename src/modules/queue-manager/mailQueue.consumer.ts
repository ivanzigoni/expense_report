import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { InternalServerErrorException } from '@nestjs/common';
import { Job } from 'bull';
import { ExpenseService } from '../database/expense/service/expense.service';
import { capitalizeFirstLetter } from '../mailer/utils/string';

@Processor('mailqueue')
export class MailQueueConsumer {
  constructor(
    private readonly mailerService: MailerService,
    private readonly expenseService: ExpenseService,
  ) {}

  @Process()
  async transcode(job: Job<string>) {
    const expenseId = job.data;

    const expense = await this.expenseService.getOneById(Number(expenseId), [
      'user',
    ]);

    const {
      description,
      expenseDate,
      expenseValue,
      user: { email, firstName, lastName },
    } = expense;

    const fullName = `${capitalizeFirstLetter(
      firstName,
    )} ${capitalizeFirstLetter(lastName)}`;
    const date = new Date(expenseDate).toLocaleString('pt-br');
    const value = `R$${expenseValue * 100}`; // reais

    try {
      console.log('sending email');

      await this.mailerService.sendMail({
        to: email,
        subject: `Despesa de ${fullName} cadastrada.`,
        html: `
          Sua despesa "${description}" efetuada no dia ${date} de valor ${value} reais foi cadastrada com sucesso!
        `,
      });

      console.log('email sent');

      return { message: 'ok' };
    } catch (err) {
      console.log(err);
      console.log('err mail');
      // TODO: LOG
      throw new InternalServerErrorException('failed to send report mail');
    }
  }
}
