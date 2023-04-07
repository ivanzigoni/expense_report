import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { CreateExpenseDto } from 'src/modules/database/expense/expense.dto';
import { ExpenseService } from 'src/modules/database/expense/service/expense.service';
import { UserService } from 'src/modules/database/user/service/user.service';
import { ExpenseManagerService } from '../service/expense-manager.service';

@UseGuards(AuthGuard)
@Controller('expense-manager')
export class ExpenseManagerController {
  constructor(
    private readonly expenseManagerService: ExpenseManagerService,
    private readonly userService: UserService,
    private readonly expenseService: ExpenseService
  ) {}

  @Post("create")
  async registerExpense(
    @Request() req,
    @Body(new ValidationPipe()) expenseDto: CreateExpenseDto
  ) {
    const user = await this.userService.getOneById(req.user.sub);

    const expense = await this.expenseService.create(expenseDto, user);
    
    return this.expenseManagerService.sendEmail({ expense });
  }

  @Get()
  fetchExpenses(
    @Request() req
  ) {
    const user = req.user;

  }

}
