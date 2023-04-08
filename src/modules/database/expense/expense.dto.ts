import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, IsNumber, MaxLength, IsPositive, IsNotEmpty, MaxDate, IsDate } from "class-validator"

export class CreateExpenseDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(191)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @MaxDate(new Date())
  expenseDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  expenseValue: number;

}

export class UpdateExpenseDto extends CreateExpenseDto {}