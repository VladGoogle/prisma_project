import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from './user.service';
import { AuthGuard } from "@nestjs/passport";
import {newPasswordDto} from "./dto/newPassword.dto";
import { UpdateUserInfoDto } from "./dto/updateUserInfo.dto";
import { ChangeUserRoleDto } from "./dto/changeUserRole.dto";
import { Roles } from "../roles/roles.decorator";
import { Role } from "../enums/role.enum";

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const userId = parseInt(id);
    return await this.userService.findUserById(userId);
  }

  @Get()
  async getAllUsers() {
    return await  this.userService.findAllUsers()
  }

  @Patch('profile/:id/updateUser')
  async updateUserInfo(@Param('id') id:string, @Body() user:UpdateUserInfoDto){
    const userId = parseInt(id)
    return await  this.userService.updateUserInfo(user, userId)
  }

  @Patch('profile/:id/changePassword')
  async changeUserPassword(@Param('id') id:string, @Body() password:newPasswordDto){
    const userId = parseInt(id)
    return await  this.userService.changeUserPassword(password, userId)
  }

  @Roles(Role.NETWORK_ADMIN)
  @Patch('network/admin/changerole/:id')
  async changeUserRole(@Param('id') id:string, @Body() data:ChangeUserRoleDto){
    const userId = parseInt(id)
    return await  this.userService.changeUserRole(data, userId)
  }

  @Delete(':id')
  async removeUser(@Param('id') id:string){
    const userId = parseInt(id)
    return await  this.userService.removeUser(userId)
  }

}
