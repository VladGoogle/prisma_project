import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail()
  email:string;

  @IsString()
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
  password:string
}