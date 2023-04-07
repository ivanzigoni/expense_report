import { Transform } from "class-transformer";
import { IsString, IsNumber, MaxLength, IsPositive, IsNotEmpty, MaxDate, IsDate } from "class-validator"

export class CreateExpenseDto {

  @IsNotEmpty()
  @IsString()
  @MaxLength(191)
  description: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @MaxDate(new Date())
  expenseDate: Date;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  expenseValue: number;

}

export class UpdateExpenseDto extends CreateExpenseDto {}