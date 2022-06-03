import { AppModule } from "../../../app.module";
import { Test } from "@nestjs/testing";
import { PrismaService } from "../../../../prisma/prisma.service";
import { UserDto } from "../../../user/dto/user.dto";
import { Role } from "../../../enums/role.enum";
import { AuthService } from "../../auth.service";
import { UserService } from "../../../user/user.service";
import { LoginDto } from "../../dto/auth.dto";
import * as bcrypt from "bcrypt"
import { response } from "express";

describe('AuthService tests', ()=>{
  let prisma: PrismaService
  let authService: AuthService
  let userService: UserService
  beforeAll(async ()=>{
    const moduleRef = await Test.createTestingModule({
      imports:[AppModule]
    }).compile()
    prisma = moduleRef.get(PrismaService);
    userService = moduleRef.get(UserService)
    authService = moduleRef.get(AuthService);
    await  prisma.cleanDatabase()
  })

  it("should be defined", async()=> {
    expect(prisma).toBeDefined()
    expect(userService).toBeDefined()
    expect(authService).toBeDefined()
  });

  describe('Register user', ()=>{
    const userDto: UserDto={
      firstName: "Vlad",
      lastName: "Google",
      email: "vlad1@gmail.com",
      password: "Asdrtyjklmnb1@",
      phone: "+14155550169",
      roles: Role.ADMIN
    }
    it("Check for user", async ()=>{
      const user = await authService.register(userDto)
      expect(user.firstName).toBe(userDto.firstName)
      expect(user.lastName).toBe(userDto.lastName)
      expect(user.email).toBe(userDto.email)
      expect(user.password).not.toBeDefined()
      expect(user.phone).toBe(userDto.phone)
    });
  })

  describe('Login', ()=>{
    const firstLoginDto: LoginDto ={
      email:"vlad1@gmail.com",
      password:"Asdr546464"
    }

    const secondLoginDto:LoginDto={
      email:"vlad@gmail.com",
      password:"Asdrtyjklmnb1@"
    }

    const thirdLoginDto: LoginDto ={
      email:"vlad1@gmail.com",
      password:"Asdrtyjklmnb1@"
    }

    it("First login validation ", async ()=> {
      try {
        const user = await authService.login(firstLoginDto)
        expect(typeof user).toBe('object')
      } catch (error) {
        expect(error.status).toBe(401)
      }
    })

      it("Second login validation", async ()=>{
          try {
            const user = await authService.login(secondLoginDto)
            expect(typeof user).toBe('object')
          } catch (error) {
            expect(error.status).toBe(401)
          }
        })

      it("Third login validation ", async()=> {
        try {
          const user = await authService.login(thirdLoginDto)
          expect(typeof user).toBe('object')
        } catch (error){
          expect(error.status).toBe(401)
        }
      });
  });
});