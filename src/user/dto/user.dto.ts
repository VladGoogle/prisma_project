import { IsNotEmpty, IsEmail, IsEnum, IsString, Matches, IsNumber, IsInt, IsMobilePhone } from "class-validator";
import { Role } from "../../enums/role.enum";
import { IsE164PhoneNumber } from "../../validators/phone.validator";

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

  @IsE164PhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsEnum(Role)
  roles: Role;
}
