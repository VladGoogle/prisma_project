import {BadRequestException, Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from "../user/user.service";
import { UserDto } from "../user/dto/user.dto";
import { LoginDto } from "./dto/auth.dto";



@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: LoginDto) {
    const payload = { email: user.email };
    const userObj = await this.userService.findUserByEmail(user.email)
    const isValid = await bcrypt.compare(user.password, userObj.password)
    if(!isValid) {
      throw new BadRequestException('Invalid user credentials')
    }
    const access_token = this.jwtService.sign(payload)
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