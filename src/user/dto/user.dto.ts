import { IsNotEmpty, IsEmail, IsEnum, IsString, Matches } from "class-validator";
import { Role } from "../../enums/role.enum";

export class UserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
  password: string;

  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEnum(Role)
  roles: Role;
}
