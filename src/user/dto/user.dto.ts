import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';
export enum Role {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}

export class UserDto {
  firstName: string;
  lastName: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  phone: string;

  @IsNotEmpty()
  @IsEnum(Role)
  type: Role;
}
