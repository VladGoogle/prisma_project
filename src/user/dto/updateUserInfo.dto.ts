import { IsEmail, IsEnum, IsString } from "class-validator";
import { IsE164PhoneNumber } from "../../validators/phone.validator";
import { Role } from "../../enums/role.enum";

export class UpdateUserInfoDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsE164PhoneNumber()
  phone: string;

  @IsEnum(Role)
  roles: Role;
}
