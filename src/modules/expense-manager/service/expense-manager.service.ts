import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ExpenseService } from 'src/modules/database/expense/service/expense.service';
import { capitalizeFirstLetter } from 'src/modules/mailer/utils/string';
import { SendEmailPayload } from '../interfaces/register-expense.dto';

@Injectable()
export class ExpenseManagerService {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly mailerService: MailerService
  ) {}

  public async sendEmail(payload: SendEmailPayload) {
    // fila com redis?

    const {
      expense: {
        description,
        expenseDate,
        expenseValue,
        user: {
          email,
          firstName,
          lastName,
        }
      }
    } = payload;

    const fullName = `${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(lastName)}`
    const date = expenseDate.toLocaleString("pt-br")
    const value = expenseValue * 100 // reais

    try {

      return this.mailerService.sendMail({
        to: email,
        subject: `Despesa de ${fullName} cadastrada.`,
        html: `
          Sua despesa "${description}" efetuada no dia ${date} de valor ${value} reais foi cadastrada com sucesso!
        `
      })
    
    } catch (err) {

      console.log(err)
      console.log("err mail")

    }

  }
}
