import { IsNotEmpty, Matches, MinLength } from "class-validator";

export class newPasswordDto {

  @MinLength(6)
  @IsNotEmpty()
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
  oldPassword: string;

  @MinLength(6)
  @IsNotEmpty()
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
  newPassword: string;

  @MinLength(6)
  @IsNotEmpty()
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
  repeatPassword: string;

}
