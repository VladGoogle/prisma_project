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
  async login(@Body() loginBody: LoginDto) {
    return await this.authService.login(loginBody);
  }

  @Post('signup')
  async signUp(@Body() user: UserDto) {
    return await this.authService.register(user);
  }
}