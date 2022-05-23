import { IsEnum } from "class-validator";
import { Role } from "../../enums/role.enum";

export class ChangeUserRoleDto {
  @IsEnum(Role)
  roles: Role;
}
