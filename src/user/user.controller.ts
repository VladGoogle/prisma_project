import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async createUser(@Body() user: UserDto) {
    return await this.userService.createUser(user);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const userId = parseInt(id);
    return await this.userService.findUserById(userId);
  }
}
