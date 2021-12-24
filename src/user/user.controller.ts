import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from "@nestjs/passport";

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const userId = parseInt(id);
    return await this.userService.findUserById(userId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllUsers() {
    return await  this.userService.findAllUsers()
  }

  @Patch(':id')
  async updateUserInfo(@Param('id') id:string, @Body() user:UserDto){
    const userId = parseInt(id)
    return await  this.userService.updateUserInfo(user, userId)
  }

  @Delete(':id')
  async removeUser(@Param('id') id:string){
    const userId = parseInt(id)
    return await  this.userService.removeUser(userId)
  }
}
