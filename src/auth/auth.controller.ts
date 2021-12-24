import {
  Controller,
  Body,
  Post, Res, UseGuards
} from "@nestjs/common";
import { AuthService} from "./auth.service";
import { UserDto } from "../user/dto/user.dto";
import { LoginDto } from "./dto/auth.dto";
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginBody: LoginDto, @Res() res:Response) {
    const token = await this.authService.login(loginBody);
    // res.cookie('access_token', token, {
    //   httpOnly: true,
    //   domain: 'localhost', // your domain here!
    //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    // })
    res.set("access_token", token)
      .send({ success:true, token });
  }

  @Post('signup')
  async signUp(@Body() user: UserDto) {
    return await this.authService.register(user);
  }
}