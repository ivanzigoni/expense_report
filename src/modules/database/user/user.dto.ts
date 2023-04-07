import { IsNotEmpty, IsString, MinLength, IsEmail } from "class-validator"

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: "password must have at least 6 characters" })
  password: string;
}

export interface UpdateUserDto extends CreateUserDto {}