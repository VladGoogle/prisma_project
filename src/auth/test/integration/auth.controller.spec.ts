import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../auth.controller';
import { AppModule } from "../../../app.module";
import { Role } from "../../../enums/role.enum";
import { UserDto } from "../../../user/dto/user.dto";
import { response } from "express";
import { Response } from "express";
import { PrismaService } from "../../../../prisma/prisma.service";
import { UserService } from "../../../user/user.service";
import { AuthService } from "../../auth.service";
import { LoginDto } from "../../dto/auth.dto";

describe('AuthController', () => {
  let authController: AuthController;
  let prisma: PrismaService
  let userService: UserService
  let authService: AuthService

  // const statusResponseMock ={
  //   send: jest.fn((x)=>x)
  // }
  //
  // const responseMock = {
  //   status: jest.fn((x)=>statusResponseMock),
  //   send: jest.fn((x)=>x)
  // } as unknown as Response

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    prisma = moduleRef.get(PrismaService);
    authController = moduleRef.get(AuthController)
    userService = moduleRef.get(UserService)
    authService = moduleRef.get(AuthService)
    await  prisma.cleanDatabase()
  });

  it("should be defined ", async()=> {
    expect(authController).toBeDefined()
  });

  it("Should register new user", async ()=> {
    const requestBody: UserDto ={
      "firstName": "Vlad",
      "lastName": "Google",
      "email": "vlad1@gmail.com",
      "password": "Asdrtyjklmnb1@",
      "phone": "+14155550169",
      "roles": Role.ADMIN
    }

    const spyUserService = jest.spyOn(userService, 'registerUser')
    const spyAuthService = jest.spyOn(authService, 'register')
    const user = await authController.signUp(requestBody)
    expect(spyUserService).toHaveBeenCalled()
    expect(spyAuthService).toHaveBeenCalled()
    expect(user).toHaveProperty('createdAt')
    expect(user).toHaveProperty('updatedAt')
    expect(user).toHaveProperty('token')
    expect(user.password).not.toBeDefined()
  });


    it("Should login", async()=> {
      const requestBody: UserDto ={
        "firstName": "Vlad",
        "lastName": "Google",
        "email": "vlad1@gmail.com",
        "password": "Asdrtyjklmnb1@",
        "phone": "+14155550169",
        "roles": Role.ADMIN
      }

      const loginBody: LoginDto ={
        email: "vlad1@gmail.com",
        password:"Asdrtyjklmnb1@"
      }
      await authController.signUp(requestBody)
      const spyFindUserService = jest.spyOn(userService, "findUserByEmail")
      const spyLoginAuthService = jest.spyOn(authService, 'login')
      const userLogin = await authController.login(loginBody)
      expect(spyFindUserService).toHaveBeenCalled()
      expect(spyLoginAuthService).toHaveBeenCalled()
      expect(typeof userLogin).toBe('object')
      expect(userLogin).toHaveProperty('access_token')
    });
});
