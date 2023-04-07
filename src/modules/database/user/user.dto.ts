import { IsString, MinLength, IsEmail } from "class-validator"

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: "password must have at least 6 characters" })
  password: string;
}

export interface UpdateUserDto extends CreateUserDto {}