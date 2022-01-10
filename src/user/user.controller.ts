import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from "@nestjs/passport";
import {newPasswordDto} from "./dto/newPassword.dto";

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
  async updateUserInfo(@Param('id') id:string, @Body() user:UserDto){
    const userId = parseInt(id)
    return await  this.userService.updateUserInfo(user, userId)
  }

  @Patch('profile/:id/changePassword')
  async changeUserPassword(@Param('id') id:string, @Body() password:newPasswordDto){
    const userId = parseInt(id)
    return await  this.userService.changeUserPassword(password, userId)
  }

  @Delete(':id')
  async removeUser(@Param('id') id:string){
    const userId = parseInt(id)
    return await  this.userService.removeUser(userId)
  }
}
