import { IsNotEmpty, MinLength } from "class-validator";

export class newPasswordDto {

  @MinLength(6)
  @IsNotEmpty()
  oldPassword: string;

  @MinLength(6)
  @IsNotEmpty()
  newPassword: string;

  @MinLength(6)
  @IsNotEmpty()
  repeatPassword: string;

}
