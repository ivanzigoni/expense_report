import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DeleteRes } from '../../../common/deleteResult.interface';
import { ExpenseEntity } from '../../../modules/database/expense/expense.entity';
import { DeleteResult } from 'typeorm';
import { AuthGuard } from '../../../modules/auth/auth.guard';
import {
  CreateExpenseDto,
  UpdateExpenseDto,
} from '../../../modules/database/expense/expense.dto';
import { ExpenseService } from '../../../modules/database/expense/service/expense.service';
import { UserService } from '../../../modules/database/user/service/user.service';
import { ExpenseManagerService } from '../service/expense-manager.service';

@ApiTags('Expenses Manager')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('expense-manager')
export class ExpenseManagerController {
  constructor(
    private readonly expenseManagerService: ExpenseManagerService,
    private readonly userService: UserService,
    private readonly expenseService: ExpenseService,
  ) {}

  @ApiOkResponse({
    type: ExpenseEntity,
  })
  @Post('create')
  async registerExpense(
    @Request() req,
    @Body(new ValidationPipe()) expenseDto: CreateExpenseDto,
  ): Promise<ExpenseEntity> {
    const userId = req.user.sub;

    const user = await this.userService.getOneById(userId, []);

    const expense = await this.expenseService.create(expenseDto, user);

    await this.expenseManagerService.sendConfirmationMail({ expense });

    return expense;
  }

  @ApiOkResponse({
    type: Array<ExpenseEntity>,
  })
  @Get('all')
  async fetchExpenses(@Request() req): Promise<ExpenseEntity[]> {
    const userId = req.user.sub;

    const expensesByUser = await this.userService.getOneById(userId, [
      'expenses',
    ]);

    return expensesByUser.expenses;
  }

  @ApiOkResponse({
    type: ExpenseEntity,
  })
  @Get(':id')
  async fetchExpenseById(@Param() params, @Req() req): Promise<ExpenseEntity> {
    const userId = req.user.sub;
    const expenseId = params.id;

    const expense = await this.expenseService.getOneById(expenseId, ['user']);

    if (expense.user.id !== userId) {
      throw new ForbiddenException();
    } else {
      return expense;
    }
  }

  @ApiOkResponse({
    type: ExpenseEntity,
  })
  @Put(':id')
  async updateExpense(
    @Param() params,
    @Req() req,
    @Body(new ValidationPipe()) expenseDto: UpdateExpenseDto,
  ): Promise<ExpenseEntity> {
    const userId = req.user.sub;
    const expenseId = params.id;

    const expense = await this.expenseService.getOneById(expenseId, ['user']);

    if (expense.user.id !== userId) {
      throw new ForbiddenException();
    } else {
      return this.expenseService.update(expenseId, expenseDto);
    }
  }

  @ApiOkResponse({
    type: DeleteRes,
  })
  @Delete(':id')
  async deleteExpense(@Param() params, @Req() req): Promise<DeleteRes> {
    const userId = req.user.sub;
    const expenseId = params.id;

    const expense = await this.expenseService.getOneById(expenseId, ['user']);

    if (expense.user.id !== userId) {
      throw new ForbiddenException();
    } else {
      return this.expenseService.delete(expenseId);
    }
  }
}
