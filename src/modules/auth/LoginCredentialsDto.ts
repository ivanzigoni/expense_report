import { IsString } from "class-validator"

export class LoginCredentialsDto {

  @IsString()
  email: string;

  @IsString()
  password: string;

}