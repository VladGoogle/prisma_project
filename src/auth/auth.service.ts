import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from "../user/user.service";
import { UserDto } from "../user/dto/user.dto";
import { LoginDto } from "./dto/auth.dto";
import { ErrorHandlers } from "../middlewares/error.handlers";



@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly errorHandlers: ErrorHandlers
  ) {}

  async login(user: LoginDto) {
    const isValidEmail = await this.userService.findUserByEmail(user.email)
    if(!isValidEmail) {
      throw new UnauthorizedException('Invalid user credentials')
    }
    const isValidPassword = await bcrypt.compare(user.password, isValidEmail.password)
    if(!isValidPassword) {
      throw new UnauthorizedException('Invalid user credentials')
    }
    const access_token = this.jwtService.sign({
      email: isValidEmail.email,
      roles: isValidEmail.roles
    })
    return {access_token};
  }

  public async register(user:UserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    try {
      const createdUser = await this.userService.registerUser({
        ...user,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      console.log(error)
    }
  }
}