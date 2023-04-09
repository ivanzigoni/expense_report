import { Body, ClassSerializerInterceptor, Controller, Delete, ForbiddenException, Get, Param, Post, Put, Req, Request, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { CreateExpenseDto, UpdateExpenseDto } from 'src/modules/database/expense/expense.dto';
import { ExpenseService } from 'src/modules/database/expense/service/expense.service';
import { UserService } from 'src/modules/database/user/service/user.service';
import { ExpenseManagerService } from '../service/expense-manager.service';

@ApiTags("Expenses Manager")
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('expense-manager')
export class ExpenseManagerController {
  constructor(
    private readonly expenseManagerService: ExpenseManagerService,
    private readonly userService: UserService,
    private readonly expenseService: ExpenseService,
  ) {}

  @Post("create")
  async registerExpense(
    @Request() req,
    @Body(new ValidationPipe()) expenseDto: CreateExpenseDto
  ) {
    const userId = req.user.sub;

    const user = await this.userService.getOneById(userId, []);

    const expense = await this.expenseService.create(expenseDto, user);
    
    return this.expenseManagerService.sendEmail({ expense });
  }

  @Get("all")
  fetchExpenses(
    @Request() req,
  ) {
    const userId = req.user.sub;

    return this.userService.getOneById(userId, ["expenses"]);
  }

  @Get(":id")
  async fetchExpenseById(
    @Param() params,
    @Req() req
  ) {
    const userId = req.user.sub;
    const expenseId = params.id

    const expense = await this.expenseService.getOneById(expenseId, ["user"]);

    if (expense.user.id !== userId) {
      throw new ForbiddenException()
    } else {
      return expense;
    }
  }

  @Put(":id")
  async updateExpense(
    @Param() params,
    @Req() req,
    @Body(new ValidationPipe()) expenseDto: UpdateExpenseDto
  ) {
    const userId = req.user.sub;
    const expenseId = params.id;

    const expense = await this.expenseService.getOneById(expenseId, ["user"]);

    if (expense.user.id !== userId) {
      throw new ForbiddenException()
    } else {
      return this.expenseService.update(expenseId, expenseDto)
    }
  }

  @Delete(":id")
  async deleteExpense (
    @Param() params,
    @Req() req,
  ) {
    const userId = req.user.sub;
    const expenseId = params.id;

    const expense = await this.expenseService.getOneById(expenseId, ["user"]);

    if (expense.user.id !== userId) {
      throw new ForbiddenException()
    } else {
      return this.expenseService.delete(expenseId);
    }

  }

}
