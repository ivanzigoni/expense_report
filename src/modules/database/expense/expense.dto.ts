import { IsString, IsDateString, IsNumber } from "class-validator"

export class CreateExpenseDto {

  @IsString()
  description: string;

  @IsDateString()
  expenseDate: Date;

  @IsNumber()
  userId: number;

  @IsNumber()
  expenseValue: number;

}

export class UpdateExpenseDto extends CreateExpenseDto {}